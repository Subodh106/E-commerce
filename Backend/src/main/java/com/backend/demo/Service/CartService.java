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
import org.jspecify.annotations.NonNull;
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

    @Transactional
    public CartResponseDto addToCart(CartItemDto cartItemDto, Long userId) {
        // 1. Fetch or initialize Cart
        Cart existedCart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            newCart.setCreated_at(new Date());
            newCart.setCartItems(new ArrayList<>()); // Ensure list is initialized
            newCart.setShipping(BigDecimal.ZERO);    // Ensure shipping is not null
            return newCart;
        });

        if (existedCart.getCartItems() == null) {
            existedCart.setCartItems(new ArrayList<>());
        }

        // 2. Fetch Product
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // 3. Find existing CartItem if present
        CartItem cartItem = existedCart.getCartItems().stream()
                .filter(item -> Objects.equals(item.getProductId(), product.getId()))
                .findFirst()
                .orElse(null);

        // 4. Update existing or create new CartItem
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + cartItemDto.getQuantity());
            cartItem.setSubTotal(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        } else {
            CartItem newCartItem = createCartItem(cartItemDto, product, existedCart);
            existedCart.getCartItems().add(newCartItem);
        }

        // 5. Recalculate totals cleanly
        BigDecimal subTotal = BigDecimal.ZERO;
        for (CartItem item : existedCart.getCartItems()) {
            if (item.getSubTotal() != null) {
                subTotal = subTotal.add(item.getSubTotal());
            }
        }

        existedCart.setSubTotal(subTotal);
        BigDecimal shipping = existedCart.getShipping() != null ? existedCart.getShipping() : BigDecimal.ZERO;
        existedCart.setTotal(subTotal.add(shipping));
        existedCart.setUpdated_at(new Date());

        // 6. Save and Return
        Cart savedCart = cartRepository.save(existedCart);
        return buildCartDto(savedCart);
    }

    private static @NonNull CartItem createCartItem(CartItemDto cartItemDto, Product product, Cart existedCart) {
        CartItem cartItem = new CartItem();
        cartItem.setProductId(product.getId());
        cartItem.setCategory(product.getCategory());
        cartItem.setPrice(product.getPrice());
        cartItem.setImageUrl(product.getImageUrl());
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setCart(existedCart);
        cartItem.setAdded_at(new Date());

        BigDecimal price = product.getPrice() != null ? product.getPrice() : BigDecimal.ZERO;
        BigDecimal quantity = BigDecimal.valueOf(cartItem.getQuantity());
        cartItem.setSubTotal(price.multiply(quantity));
        return cartItem;
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