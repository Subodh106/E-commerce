package com.backend.demo.Service;

import com.backend.demo.Dto.Category.CategoryDto;
import com.backend.demo.Dto.Category.CategoryResponseDto;
import com.backend.demo.Dto.Category.CategorySummaryDto;
import com.backend.demo.Dto.Product.ProductResponseDto;
import com.backend.demo.Dto.User.UserSummaryDto;
import com.backend.demo.Entities.Category;
import com.backend.demo.Entities.Product;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CategoryRepository;
import com.backend.demo.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryResponseDto createCategory(CategoryDto categoryDto){
        Category category = new Category();
        category.setName(categoryDto.getCategory());
        Category savedCategory = categoryRepository.save(category);
        List<Product> products = productRepository.findAllByCategoryId(savedCategory.getId()).orElseGet(ArrayList::new);
        savedCategory.setProductList(products);
        return buildCategory(savedCategory);
    }

    public List<CategoryResponseDto> getAllCategory(){
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponseDto> categoryList = new ArrayList<>();
        for(Category category : categories){
            categoryList.add(buildCategory(category));
        }
        return categoryList;
    }

    public void deleteCategory(Long Id){
        Category category = categoryRepository.findById(Id).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        if(!category.getProductList().isEmpty()){
            throw new IllegalStateException("Cannot delete category containing products");
        }
        categoryRepository.deleteById(Id);
    }

    private CategoryResponseDto buildCategory(Category category){
        CategoryResponseDto categoryResponse = new CategoryResponseDto();
        categoryResponse.setId(category.getId());
        List<ProductResponseDto> products = new ArrayList<>();
        for(Product product : category.getProductList()){
            products.add(buildProductResponse(product));
        }
        categoryResponse.setProducts(products);
        return categoryResponse;
    }

    private ProductResponseDto buildProductResponse(Product product){
        ProductResponseDto response = new ProductResponseDto();
        response.setId(product.getId());
        response.setProductName(product.getProductName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setImageUrl(product.getImageUrl());
        response.setPublicId(product.getPublicId());
        response.setCategory(new CategorySummaryDto(product.getCategory().getId(),product.getCategory().getName()));
        response.setCreatedBy(new UserSummaryDto(product.getCreatedBy().getId(),product.getCreatedBy().getUsername() ,product.getCreatedBy().getRole()));
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());

        return response;
    }

}
