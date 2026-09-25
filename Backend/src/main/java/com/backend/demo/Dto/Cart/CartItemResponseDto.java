package com.backend.demo.Dto.Cart;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import com.backend.demo.Entities.Cart;
import com.backend.demo.Entities.Category;
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
    private Long Id;
    private Long productId;
    private CategorySummaryDto category;
    private BigDecimal price;
    private String imageUrl;
    private int quantity;
    private Cart cart;
    private BigDecimal subtotal;
    private Date added_at;

    public void setCategory(Category category) {

    }
}
