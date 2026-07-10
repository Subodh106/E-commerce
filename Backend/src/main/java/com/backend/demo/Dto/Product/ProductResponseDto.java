package com.backend.demo.Dto.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponseDto {
    private long id;
    private String productName;
    private String description;
    private BigDecimal price;
    private int stock;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
