package com.backend.demo.Dto.Order;

import com.backend.demo.Entities.OrderStatus;
import com.backend.demo.Entities.PaymentType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class OrderResponse {
    private Long id;
    private Long customerId;
    private Date orderDate;
    private OrderStatus orderStatus;
    private BigDecimal subTotal;
    private BigDecimal totalAmount;
    private PaymentType paymentType;
    private List<OrderItemResponseDto> orderItem;
    private String trackingNumber;
    private Date updatedAt;
}
