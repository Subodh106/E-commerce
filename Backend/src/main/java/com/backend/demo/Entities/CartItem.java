package com.backend.demo.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.DialectOverride;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false )
    private Product product;


    @Positive
    @Column(
            nullable = false ,
            name = "quantity" ,
            check = {
                @CheckConstraint(
                    name = "check_quantity_positive",
                    constraint = "quantity > 0"
                )
            },

            columnDefinition = "quantity"
    )
    @Min(1)
    private Integer quantity;

    @Column(nullable = false)
    private Date added_at;

}
