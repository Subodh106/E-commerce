package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Product.ProductRequestDto;
import com.backend.demo.Dto.Product.ProductResponseDto;
import com.backend.demo.Security.CustomUserDetails;
import com.backend.demo.Service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(@Valid @RequestBody ProductRequestDto createProductDto, @AuthenticationPrincipal CustomUserDetails user) {
        ProductResponseDto response = productService.create(createProductDto, user.getId());

        ApiResponse<ProductResponseDto> productResponse = new ApiResponse<ProductResponseDto>("Product Created Successfully", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(productResponse);
    }
}