package com.backend.demo.Service;

import com.backend.demo.Dto.Order.OrderItemDto;
import com.backend.demo.Dto.Order.OrderResponse;
import com.backend.demo.Entities.OrderItem;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
public OrderResponse placeOrder(OrderItemDto orderItem){
    OrderItem orderItems = new OrderItem();
    return orderItems;
}
}
