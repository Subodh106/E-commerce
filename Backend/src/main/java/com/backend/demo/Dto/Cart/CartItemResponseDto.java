package com.backend.demo.Dto.Cart;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import com.backend.demo.Entities.Cart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartItemResponseDto {
    private Long id;
    private Long productId;
    private String productName;
    private CategorySummaryDto categorySummary;
    private BigDecimal price;
    private String imageUrl;
    private int quantity;
    private Long cartId;
    private BigDecimal subtotal;
    private Date added_at;
}
