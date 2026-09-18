package com.backend.demo.Service;

import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Entities.Cart;
import com.backend.demo.Entities.Product;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CartRepository;
import com.backend.demo.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public Cart addToCart(CartItemDto cartItemDto , Long userId){
        Optional<Cart> existedCart=  cartRepository.findByUserId(userId);
        Product product = productRepository.findById(cartItemDto.getProductId()).orElseThrow(()->new ResourceNotFoundException("Product is not found"));
        Cart newCart = new Cart();
        newCart.setUserId(userId);
        newCart.setCartItems(product.getId(),product.getCategory(),product.getPrice(),cartItemDto.getQuantity(),new Date());
        newCart.setCreated_at(new Date());
        newCart.setUpdated_at(new Date());
    return newCart;
    }

}
