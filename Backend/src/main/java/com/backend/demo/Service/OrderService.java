package com.backend.demo.Service;

import com.backend.demo.Dto.Order.OrderItemDto;
import com.backend.demo.Entities.*;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CartItemRepository;
import com.backend.demo.Repository.OrderItemRepository;
import com.backend.demo.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;

public Void placeOrder(OrderItemDto orderItem, Long userId){
    Order order = new Order();
    List<OrderItem> orderItemList = new ArrayList<>();
    for(Long cartItemId:orderItem.getCartItemId()) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));
        OrderItem orderItems = new OrderItem();
        orderItems.setProduct_id(cartItem.getProductId());
        orderItems.setQuantity(cartItem.getQuantity());
        orderItems.setPrice(cartItem.getPrice());
        orderItems.setCategory(cartItem.getCategory());
        orderItems.setOrder_id(order.getId());
        orderItemList.add(orderItems);
        orderItemRepository.save(orderItems);
    }
    order.setCustomer_id(userId);
    order.setOrder_date(new Date());
    order.setOrder_status(OrderStatus.Pending);
    order.setOrder_item(orderItemList);
    order.setBilling_address(
            orderItem.getFullName(),
            orderItem.getPhoneNumber(),
            orderItem.getStreet(),
            orderItem.getPostalCode()
    );
    order.setShipping_address( orderItem.getFullName(),
            orderItem.getPhoneNumber(),
            orderItem.getStreet(),
            orderItem.getPostalCode());
    // calculate total_amount
    BigDecimal total_amount = BigDecimal.ZERO;
    for(OrderItem orderItem1:orderItemList){
        total_amount = total_amount.add(orderItem1.getPrice());
    }
    order.setTotal_amount(total_amount);
    Order savedOrder = orderRepository.save(order);

    return null;
}
}
