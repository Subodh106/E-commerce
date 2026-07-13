package com.backend.demo.Dto.Product;

import com.backend.demo.Dto.Category.CategoryDto;
import com.backend.demo.Dto.user.UserSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponseDto {
    private  long id;

    private String productName;
    private String description;
    private BigDecimal price;
    private int stock;
    private List<CategoryDto> category;
    private String imageUrl;
    private UserSummaryDto createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
