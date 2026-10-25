package com.backend.demo.Service;

import com.backend.demo.Dto.Cart.CartItemDto;
import com.backend.demo.Dto.Cart.CartItemResponseDto;
import com.backend.demo.Dto.Cart.CartResponseDto;
import com.backend.demo.Entities.Cart;
import com.backend.demo.Entities.CartItem;
import com.backend.demo.Entities.Product;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.CartItemRepository;
import com.backend.demo.Repository.CartRepository;
import com.backend.demo.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    @Transactional
    public CartResponseDto addToCart(CartItemDto cartItemDto, Long userId) {
        // 1. Fetch or initialize Cart
        Cart existedCart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            newCart.setCreated_at(new Date());
            newCart.setUpdated_at(new Date());
            newCart.setCartItems(new ArrayList<>());
            newCart.setSubTotal(BigDecimal.ZERO);
            return newCart;
        });



        // 2. Fetch Product
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        System.out.println();
        System.out.println(product.getCategory());
        System.out.println(product.getPrice());
        System.out.println(product.getImageUrl());
        System.out.println(product.getId());
        System.out.println(product.getProductName());
        System.out.println(product.getStock());

        // 3. Find existing CartItem if present
        CartItem newCartItem = new CartItem();
        newCartItem.setProductId(product.getId());
        newCartItem.setCategory(product.getCategory());
        newCartItem.setImageUrl(product.getImageUrl());
        newCartItem.setPrice(product.getPrice());
        if(cartItemDto.getQuantity()>product.getStock()|| cartItemDto.getQuantity()==0){
            throw new IllegalArgumentException("Set correct quantity");
        }
        newCartItem.setCategory(product.getCategory());
        newCartItem.setQuantity(cartItemDto.getQuantity());
        newCartItem.setAdded_at(new Date());

        System.out.println("Before cart Item");
        CartItem savedCartItem =  cartItemRepository.save(newCartItem);

        System.out.println("After cart Item");
        List<CartItem> existedCartItems = existedCart.getCartItems();
        existedCartItems.add(savedCartItem);
        System.out.println("Before cart");
        existedCart.setCartItems(existedCartItems);

        Cart savedCart = cartRepository.save(existedCart);

        System.out.println("After cart");
        savedCartItem.setCart(savedCart);
        // calculate total sum of cartItems
        BigDecimal subTotal = BigDecimal.ZERO;
        for(CartItem cartItem:existedCartItems){
            subTotal = subTotal.add(cartItem.getPrice());
        }
        savedCart.setSubTotal(subTotal);
        System.out.println(savedCart.getId());
        System.out.println(savedCart.getUserId());
        System.out.println(savedCart.getSubTotal());
        for(CartItem cartItem:savedCart.getCartItems()){
            System.out.println(cartItem.getCategory());
            System.out.println(cartItem.getPrice());
            System.out.println(cartItem.getImageUrl());
            System.out.println(cartItem.getId());
            System.out.println(cartItem.getProductId());
            System.out.println(cartItem.getQuantity());
        }


        // 6. Save and Return
        return buildCartDto(savedCart);
    }


    public CartResponseDto getCart(Long userID) {
        Cart existingCart = cartRepository.findByUserId(userID)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        return buildCartDto(existingCart);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart existingCart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        if (existingCart.getCartItems() == null || existingCart.getCartItems().isEmpty()) {
            throw new ResourceNotFoundException("Cart is already empty");
        }
        existingCart.getCartItems().clear();
    }

    @Transactional
    public void removeProductFromCart(Long userId, Long productId) {
        Cart existingCart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        if (existingCart.getCartItems() != null) {
            existingCart.getCartItems().removeIf(cartItem -> Objects.equals(cartItem.getProductId(), productId));
        }
    }

    private CartResponseDto buildCartDto(Cart cart) {
        CartResponseDto cartResponseDto = new CartResponseDto();
        cartResponseDto.setId(cart.getId());
        List<CartItemResponseDto> cartItemsList = new ArrayList<>();

        if (cart.getCartItems() != null) {
            for (CartItem item : cart.getCartItems()) {
                CartItemResponseDto dto = new CartItemResponseDto();
                dto.setId(item.getId());
                dto.setProductId(item.getProductId());
                dto.setCategory(item.getCategory());
                dto.setPrice(item.getPrice());
                dto.setImageUrl(item.getImageUrl());
                dto.setQuantity(item.getQuantity());
                dto.setCart(item.getCart());
                dto.setAdded_at(item.getAdded_at());
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