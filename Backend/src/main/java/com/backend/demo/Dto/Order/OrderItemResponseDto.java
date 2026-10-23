package com.backend.demo.Dto.Order;


import com.backend.demo.Dto.Category.CategorySummaryDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;


@Getter
@Setter
@RequiredArgsConstructor
public class OrderItemResponseDto {
    private Long id;
    private Long orderId;
    private Long productId;
    private int quantity;
    private BigDecimal price;
    private CategorySummaryDto category;
    private Date createdAt;
    private Date updateAt;
}
