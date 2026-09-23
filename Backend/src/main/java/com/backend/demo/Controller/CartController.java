package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Dto.Cart.CartResponseDto;
import com.backend.demo.Security.CustomUserPrincipal;
import com.backend.demo.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponseDto>> getCart(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal){
        Long userId = customUserPrincipal.getId();
        CartResponseDto response = cartService.getCart(userId);
        ApiResponse<CartResponseDto> cartResponse = new ApiResponse<>("Cart fetched successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(cartResponse);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart( @AuthenticationPrincipal CustomUserPrincipal customUserPrincipal){
        Long userId = customUserPrincipal.getId();
        cartService.clearCart(userId);
        ApiResponse<Void> cartResponse = new ApiResponse<>("Cart deleted successfully", null);
        return ResponseEntity.status(HttpStatus.OK).body(cartResponse);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeProductFromCart(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal , @PathVariable String productId){
        Long userId = customUserPrincipal.getId();
        cartService.removeProductFromCart(userId , Long.parseLong(productId));
        ApiResponse<Void> cartResponse = new ApiResponse<>("Product is removed from cart successfully", null);
        return ResponseEntity.status(HttpStatus.OK).body(cartResponse);
    }
}