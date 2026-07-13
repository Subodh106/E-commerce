package com.backend.demo.Dto.Category;

import com.backend.demo.Dto.Product.ProductResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private String name;
}
