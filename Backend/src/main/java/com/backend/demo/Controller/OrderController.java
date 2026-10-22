package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Order.OrderItemDto;
import com.backend.demo.Security.CustomUserPrincipal;
import com.backend.demo.Service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private OrderService orderService;
    @GetMapping
    private ResponseEntity<ApiResponse<Void>> placeOrder(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal, @RequestBody @Valid OrderItemDto orderItem ){
        Long userId = customUserPrincipal.getId();
        Void response = orderService.placeOrder(orderItem,userId);
        ApiResponse<Void> orderResponse = new ApiResponse<>("Order placed successfully",null);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }
}
