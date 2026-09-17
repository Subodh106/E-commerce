package com.backend.demo.Dto.Cart;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartItemDto {
    private Long productId;
    private int quantity;
}
