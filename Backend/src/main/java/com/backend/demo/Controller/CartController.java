package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Entities.Cart;
import com.backend.demo.Security.CustomUserPrincipal;
import com.backend.demo.Service.CartService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;


    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addToCart(@RequestBody CartItemDto cartItemDto, @AuthenticationPrincipal CustomUserPrincipal customUserPrincipal){
        Long userId = customUserPrincipal.getId();
        System.out.println("In Controller");
        Optional<Cart> response = cartService.addToCart(cartItemDto , userId);
        ApiResponse<Void> cartResponse = new ApiResponse<>("Item added to cart successfully",null);

    return ResponseEntity.status(201).body(cartResponse);
    }
}
