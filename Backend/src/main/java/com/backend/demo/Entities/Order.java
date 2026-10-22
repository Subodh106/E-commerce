package com.backend.demo.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long customer_id;
    private Date order_date;
    private OrderStatus order_status;
    private BigDecimal sub_total;
    private BigDecimal tax_amount;
    private BigDecimal total_amount;
    private PaymentType payment_type;
    @OneToMany
    private List<OrderItem> order_item = new ArrayList<>();
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name="full_name",
                    column = @Column(name = "shipping_full_name")
            ),
            @AttributeOverride(
                    name="phone_number",
                    column = @Column(name = "shipping_phone_number")
            ),
            @AttributeOverride(
                    name="street",
                    column = @Column(name="shipping_street")
            ),
            @AttributeOverride(
                    name="postal_code",
                    column = @Column(name = "shipping_postal_code")
            )
    }
    )
    private Address shipping_address;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name="full_name",
                    column = @Column(name = "billing_full_name")
            ),
            @AttributeOverride(
                    name="phone_number",
                    column = @Column(name = "billing_phone_number")
            ),
            @AttributeOverride(
                    name="street",
                    column = @Column(name="billing_street")
            ),
            @AttributeOverride(
                    name="postal_code",
                    column = @Column(name = "billing_postal_code")
            )
    }
    )
    private Address billing_address;
    private String tracking_number;
    private Date update_at;

    public void setBilling_address(String fullName, String phoneNumber, String street, String postalCode) {

    }

    public void setShipping_address(String fullName, String phoneNumber, String street, String postalCode) {
    }
}

