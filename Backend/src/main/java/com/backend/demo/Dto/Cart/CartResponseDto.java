package com.backend.demo.Dto.Cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartResponseDto {
    private Long id;
    private Long user_id;
    private List<CartItemResponseDto> cartItems= new ArrayList<>();
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal total;
    private Date create_at;
    private Date updated_at;
}
