package com.backend.demo.Entities;

import com.backend.demo.Dto.Category.CategorySummaryDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private Long productId;

    @JoinColumn(name = "category",nullable = false)
    @ManyToOne
    private Category category;

    @Positive
    @Column(
            nullable = false,
            name = "price",
            check = {
                    @CheckConstraint(
                            name = "check_price_positive",
                            constraint = "price >= 1"
                    )
            }
    )
    @Min(0)
    private BigDecimal price;

    @Column(nullable = false)
    private String imageUrl;

    @Positive
    @Column(
            nullable = false ,
            name = "quantity" ,
            check = {
                @CheckConstraint(
                    name = "check_quantity_positive",
                    constraint = "quantity >= 0"
                )
            },

            columnDefinition = "quantity"
    )
    @Min(1)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id" , nullable = false)
    private Cart cart;

    @Column(nullable = false)
    private Date added_at;


}
