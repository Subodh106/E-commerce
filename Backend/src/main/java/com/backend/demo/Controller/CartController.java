package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Dto.Cart.CartResponseDto;
import com.backend.demo.Security.CustomUserPrincipal;
import com.backend.demo.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;


    @PostMapping
    public ResponseEntity<ApiResponse<CartResponseDto>> addToCart(@RequestBody CartItemDto cartItemDto, @AuthenticationPrincipal CustomUserPrincipal customUserPrincipal){
        Long userId = customUserPrincipal.getId();
        CartResponseDto response = cartService.addToCart(cartItemDto , userId);
        ApiResponse<CartResponseDto> cartResponse = new ApiResponse<>("Item added to cart successfully",response);

    return ResponseEntity.status(201).body(cartResponse);
    }
}
