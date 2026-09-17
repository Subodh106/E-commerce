package com.backend.demo.Service;

import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Dto.Cart.CartResponseDto;
import com.backend.demo.Entities.Cart;
import com.backend.demo.Repository.CartRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartRepository cartRepository;

    public Optional<Cart> addToCart(CartItemDto cartItemDto , Long userId){
        return cartRepository.findByUserId(userId);
    }

}
