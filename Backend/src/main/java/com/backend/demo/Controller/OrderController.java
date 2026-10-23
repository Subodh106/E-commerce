package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Order.OrderDto;
import com.backend.demo.Dto.Order.OrderResponse;
import com.backend.demo.Entities.OrderStatus;
import com.backend.demo.Security.CustomUserPrincipal;
import com.backend.demo.Service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private OrderService orderService;
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @RequestBody @Valid OrderDto orderDto ){
        Long userId = customUserPrincipal.getId();
        OrderResponse response = orderService.placeOrder(orderDto,userId);
        ApiResponse<OrderResponse> orderResponse = new ApiResponse<>("Order placed successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }
    @PostMapping("/cancel/{orderId}")
    public ResponseEntity<ApiResponse<Void>> cancelOrder(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal , @PathVariable Long orderId){
        Long userId = customUserPrincipal.getId();
        orderService.cancelOrder(orderId,userId);
        ApiResponse<Void> orderResponse = new ApiResponse<>("Order cancelled successfully",null);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrder(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal){
        Long userId = customUserPrincipal.getId();
        List<OrderResponse> response = orderService.getAllOrder(userId);
        ApiResponse<List<OrderResponse>> orderResponse = new ApiResponse<>("All Order fetched successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }

}
