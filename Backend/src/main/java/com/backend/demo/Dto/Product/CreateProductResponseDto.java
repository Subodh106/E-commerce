package com.backend.demo.Dto.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateProductResponseDto {
    private String message;
    private ProductResponseDto product;
}
