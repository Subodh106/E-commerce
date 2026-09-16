package com.backend.demo.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @OneToMany(mappedBy = "cart" ,cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

    @Column(nullable = false)
    private Date created_at;

    @Column(nullable = false)
    private Date updated_at;
}
