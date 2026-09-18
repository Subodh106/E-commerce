package com.backend.demo.Dto.Cart;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartResponseDto {
    private Long id;
    private Long user_id;
    private Long product_id;
    private CategorySummaryDto categorySummaryDto;
    private BigDecimal price;
    private int quantity;
    private Date create_at;
    private Date updated_at;
}
