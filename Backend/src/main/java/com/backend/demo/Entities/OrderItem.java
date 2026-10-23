package com.backend.demo.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order orderId;
    private Long productId;
    private int quantity;
    private BigDecimal price;
    @JoinColumn(nullable = false)
    @ManyToOne
    private Category category;
    private Date createdAt;
    private Date updatedAt;

}
