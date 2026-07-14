package com.backend.demo.Dto.Product;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import com.backend.demo.Dto.User.UserSummaryDto;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ProductResponseDto {
    private  long id;

    private String productName;
    private String description;
    private BigDecimal price;
    private int stock;
    private CategorySummaryDto category;
    private String imageUrl;
    private UserSummaryDto createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
