package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Cart.CartResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

//    @PostMapping
//    public ResponseEntity<ApiResponse<CartResponseDto>> addToCart(){
//        return new ApiResponse<>("Cart created successfully",{});
//    }
}
