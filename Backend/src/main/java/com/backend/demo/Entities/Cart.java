package com.backend.demo.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false,name = "cart_items")
    @OneToMany(mappedBy = "cart" ,cascade = CascadeType.ALL , orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    @Column(nullable = false)
    private BigDecimal subTotal;

    @Column(nullable = false)
    private BigDecimal shipping;

    @Column(nullable = false)
    private BigDecimal total;

    @Column(nullable = false)
    private Date created_at;

    @Column(nullable = false)
    private Date updated_at;

}
