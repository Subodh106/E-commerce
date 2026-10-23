package com.backend.demo.Service;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import com.backend.demo.Dto.Order.OrderDto;
import com.backend.demo.Dto.Order.OrderItemResponseDto;
import com.backend.demo.Dto.Order.OrderResponse;
import com.backend.demo.Entities.*;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CartItemRepository;
import com.backend.demo.Repository.OrderItemRepository;
import com.backend.demo.Repository.OrderRepository;
import jakarta.transaction.Transactional;
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


    @Transactional
    public OrderResponse placeOrder(OrderDto orderDto, Long userId){
        Order order = new Order();
        List<OrderItem> orderItemList = new ArrayList<>();
        order.setCustomerId(userId);
        order.setOrderDate(new Date());
        order.setOrderStatus(OrderStatus.Pending);
        order.setOrderItem(orderItemList);

        Address billingAddress = new Address();

        billingAddress.setFullName(orderDto.getBillingAddress().getFullName());
        billingAddress.setPhoneNumber(orderDto.getBillingAddress().getPhoneNumber());
        billingAddress.setCity(orderDto.getBillingAddress().getCity());
        billingAddress.setStreet(orderDto.getBillingAddress().getStreet());
        billingAddress.setPostalCode(orderDto.getBillingAddress().getPostalCode());

        order.setBillingAddress(billingAddress);

        Address shippingAddress = new Address();

        shippingAddress.setFullName(orderDto.getShippingAddress().getFullName());
        shippingAddress.setPhoneNumber(orderDto.getShippingAddress().getPhoneNumber());
        shippingAddress.setCity(orderDto.getShippingAddress().getCity());
        shippingAddress.setStreet(orderDto.getShippingAddress().getStreet());
        shippingAddress.setPostalCode(orderDto.getShippingAddress().getPostalCode());

        order.setShippingAddress(shippingAddress);

        Order savedOrder = orderRepository.save(order);

        for(Long cartItemId:orderDto.getCartItemId()) {
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));
            OrderItem orderItems = new OrderItem();
            orderItems.setProductId(cartItem.getProductId());
            orderItems.setQuantity(cartItem.getQuantity());
            orderItems.setPrice(cartItem.getPrice());
            orderItems.setCategory(cartItem.getCategory());
            orderItems.setOrderId(savedOrder);
            orderItemList.add(orderItems);
            orderItemRepository.save(orderItems);
        }

        // calculate total_amount
        BigDecimal total_amount = BigDecimal.ZERO;
        for(OrderItem orderItem1:orderItemList){
            BigDecimal sub_total = orderItem1.getPrice().multiply(BigDecimal.valueOf(orderItem1.getQuantity()));
            order.setSubTotal(sub_total);
            total_amount = total_amount.add(sub_total);
        }
        order.setTotalAmount(total_amount);


        return buildOrderResponse(order);
    }

    @Transactional
    public void cancelOrder(Long orderId, Long userId){
        Order order = orderRepository.findByIdAndCustomerId(orderId,userId).orElseThrow();
        if(order.getOrderStatus()!=OrderStatus.Pending){
            throw new IllegalStateException("Order cannot be cancelled");
        }
        order.setOrderStatus(OrderStatus.Cancelled);
        order.setUpdateAt(new Date());
    }

    public List<OrderResponse> getAllOrder(Long userId) {
        List<Order> orders = orderRepository.findByCustomerId(userId).orElseThrow();
        List<OrderResponse> orderResponseList = new ArrayList<>();
        for(Order order:orders){
            OrderResponse orderResponse = buildOrderResponse(order);
            orderResponseList.add(orderResponse);
        }
        return orderResponseList;
    }
    private OrderResponse buildOrderResponse(Order order){
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setId(order.getId());
        orderResponse.setCustomerId(order.getCustomerId());
        orderResponse.setOrderDate(order.getOrderDate());
        orderResponse.setOrderStatus(order.getOrderStatus());
        orderResponse.setSubTotal(order.getSubTotal());
        orderResponse.setTotalAmount(order.getTotalAmount());
        orderResponse.setPaymentType(order.getPaymentType());
        List<OrderItemResponseDto> orderItemResponseList = new ArrayList<>();
        for(OrderItem orderItem : order.getOrderItem()){
            OrderItemResponseDto orderItemResponse = new OrderItemResponseDto();
            orderItemResponse.setId(orderItem.getId());

            orderItemResponse.setOrderId(orderItem.getId());
            orderItemResponse.setProductId(orderItem.getProductId());
            orderItemResponse.setQuantity(orderItem.getQuantity());
            CategorySummaryDto categorySummaryDto = new CategorySummaryDto();
            categorySummaryDto.setId(orderItem.getCategory().getId());
            categorySummaryDto.setName(orderItem.getCategory().getName());
            orderItemResponse.setCategory(categorySummaryDto);
            orderItemResponse.setPrice(orderItem.getPrice());
            orderItemResponse.setCreatedAt(orderItem.getCreatedAt());
            orderItemResponseList.add(orderItemResponse);
        }
        orderResponse.setOrderItem(orderItemResponseList);
        orderResponse.setTrackingNumber(order.getTrackingNumber());
        orderResponse.setUpdatedAt(order.getUpdateAt());
        return orderResponse;
    }

}
