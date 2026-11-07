package com.backend.demo.Repository;

import com.backend.demo.Entities.Cart;
import com.backend.demo.Entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem , Long> {
Optional<CartItem> findByProductIdAndCart(Long productId , Cart cart);
Optional<CartItem> findByIdAndCart(Long Id , Cart cart);
}
