package com.backend.demo.Repository;

import com.backend.demo.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<Order> findByIdAndCustomerId(Long orderId , Long customerId);
    Optional<List<Order>> findByCustomerId(Long customerId);
}
