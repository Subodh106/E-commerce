package com.backend.demo.Service;

import com.backend.demo.Dto.Category.CategoryDto;
import com.backend.demo.Dto.Category.CategoryResponseDto;
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

    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;

    public CategoryResponseDto createCategory(CategoryDto categoryDto){
        Category category = new Category();
        category.setName(categoryDto.getCategory());
        Category savedCategory = categoryRepository.save(category);
        List<Product> products = productRepository.findAllByCategoryId(savedCategory.getId()).orElseGet(ArrayList::new);
        savedCategory.setProductList(products);
        return null;
    }
}
