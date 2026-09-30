package com.backend.demo.Dto.Category;

import com.backend.demo.Dto.Product.ProductResponseDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class CategoryResponseDto {
    private Long Id;
    private String category;
    private List<ProductResponseDto> products = new ArrayList<>();
}
