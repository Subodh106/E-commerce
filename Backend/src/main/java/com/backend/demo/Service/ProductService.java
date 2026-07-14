package com.backend.demo.Service;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import com.backend.demo.Dto.Product.ProductRequestDto;
import com.backend.demo.Dto.Product.ProductResponseDto;
import com.backend.demo.Dto.User.UserSummaryDto;
import com.backend.demo.Entities.Category;
import com.backend.demo.Entities.Product;
import com.backend.demo.Entities.User;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CategoryRepository;
import com.backend.demo.Repository.ProductRepository;
import com.backend.demo.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductResponseDto create(ProductRequestDto createProductDto , Long id){
        Product product = new Product();
        product.setProductName(createProductDto.getProductName());
        product.setDescription(createProductDto.getDescription());
        product.setPrice(createProductDto.getPrice());
        product.setImageUrl(createProductDto.getImageUrl());
        product.setStock(createProductDto.getStock());
        Category category = categoryRepository.findById(createProductDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        product.setCategory(category);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        product.setCreatedBy(user);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
       Product savedProduct= productRepository.save(product);
       return buildProductResponse(savedProduct);
    }

    public List<ProductResponseDto> getAllProducts(int size , int page , String direction , String sortBy){
        Sort sort = direction.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Product> productPage = productRepository.findAll(pageable);
      return productPage.map(this::buildProductResponse).getContent();
    }


    private ProductResponseDto buildProductResponse(Product product){
        ProductResponseDto response = new ProductResponseDto();
        response.setId(product.getId());
        response.setProductName(product.getProductName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setImageUrl(product.getImageUrl());
        response.setCategory(new CategorySummaryDto(product.getCategory().getId(),product.getCategory().getName()));
        response.setCreatedBy(new UserSummaryDto(product.getCreatedBy().getId(),product.getCreatedBy().getUsername()));
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        return response;
    }
}
