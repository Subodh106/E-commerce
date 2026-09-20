package com.backend.demo.Service;

import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Dto.Cart.CartItemResponseDto;
import com.backend.demo.Dto.Cart.CartResponseDto;
import com.backend.demo.Entities.Cart;
import com.backend.demo.Entities.CartItem;
import com.backend.demo.Entities.Product;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CartRepository;
import com.backend.demo.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public CartResponseDto addToCart(CartItemDto cartItemDto , Long userId){
        Cart existedCart=  cartRepository.findByUserId(userId).orElseGet(
                ()->{
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setCreated_at(new Date());
                    return newCart;
                }
        );

        Product product = productRepository.findById(
                cartItemDto.getProductId()).orElseThrow(()->
                    new ResourceNotFoundException("Product is not found")
                );
        if(existedCart.getCartItems()==null){
            existedCart.setCartItems(new ArrayList<>());
        }

        CartItem cartItem = new CartItem();
        cartItem.setProductId(product.getId());
        cartItem.setCategory(product.getCategory());
        cartItem.setPrice(product.getPrice());
        cartItem.setImageUrl(product.getImageUrl());
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setCart(existedCart);

        existedCart.setUserId(userId);
        List<CartItem> cartItemList = existedCart.getCartItems();
        cartItemList.add(cartItem);
        existedCart.setCartItems(cartItemList);
        existedCart.setUpdated_at(new Date());
        Cart savedCart = cartRepository.save(existedCart);
        return buildCartDto(savedCart);
    }

    public CartResponseDto getCart(Long userID){
        Cart existingCart = cartRepository.findByUserId(userID).orElseThrow(()-> new ResourceNotFoundException("Cart not found"));
        return buildCartDto(existingCart);
    }

    public void deleteCart(Long userId){
        Cart existingCart = cartRepository.findByUserId(userId).orElseThrow(()-> new ResourceNotFoundException("Cart not found"));
        cartRepository.delete(existingCart);
    }

    @Transactional
    public void removeProductFromCart(Long userId , Long productId){
        Cart existingCart = cartRepository.findByUserId(userId).orElseThrow(()->new ResourceNotFoundException("Cart not found"));
        List<CartItem> cartItems = existingCart.getCartItems();
        cartItems.removeIf(cartItem -> Objects.equals(cartItem.getProductId(), productId));
    }

    private CartResponseDto buildCartDto(Cart cart){
        CartResponseDto cartResponseDto = new CartResponseDto();
        cartResponseDto.setId(cart.getId());
        List<CartItemResponseDto> cartItemsList = new ArrayList<>();
        if(cart.getCartItems()!=null){
        for(CartItem cartItems : cart.getCartItems()){
            CartItemResponseDto dto = new CartItemResponseDto();
            dto.setId(cartItems.getId());
            dto.setProductId(cartItems.getProductId());
            dto.setCategory(cartItems.getCategory());
            dto.setPrice(cartItems.getPrice());
            dto.setImageUrl(cartItems.getImageUrl());
            dto.setQuantity(cartItems.getQuantity());
            dto.setCart(cartItems.getCart());
            dto.setAdded_at(cartItems.getAdded_at());
            cartItemsList.add(dto);
        }
        }
        cartResponseDto.setCartItems(cartItemsList);
        cartResponseDto.setUser_id(cart.getUserId());
        cartResponseDto.setCreate_at(cart.getCreated_at());
        cartResponseDto.setUpdated_at(cart.getUpdated_at());
        return cartResponseDto;
    }

}
