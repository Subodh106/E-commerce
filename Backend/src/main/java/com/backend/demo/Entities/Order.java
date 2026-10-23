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
    private Long customerId;
    private Date orderDate;
    private OrderStatus orderStatus;
    private BigDecimal subTotal;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;
    private PaymentType paymentType;
    @OneToMany(
            mappedBy = "orderId",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItem = new ArrayList<>();
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name="fullName",
                    column = @Column(name = "shippingFullName")
            ),
            @AttributeOverride(
                    name="phoneNumber",
                    column = @Column(name = "shippingPhoneNumber")
            ),
            @AttributeOverride(
                    name="city",
                    column = @Column(name = "shippingCity")
            ),
            @AttributeOverride(
                    name="street",
                    column = @Column(name="ShippingStreet")
            ),
            @AttributeOverride(
                    name="postalCode",
                    column = @Column(name = "shippingPostalCode")
            )
    }
    )
    private Address shippingAddress;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name="full_name",
                    column = @Column(name = "billingFullName")
            ),
            @AttributeOverride(
                    name="phone_number",
                    column = @Column(name = "billingPhoneNumber")
            ),
            @AttributeOverride(
                    name = "city",
                    column = @Column(name = "billingCity")
            ),
            @AttributeOverride(
                    name="street",
                    column = @Column(name="billingStreet")
            ),
            @AttributeOverride(
                    name="postal_code",
                    column = @Column(name = "billingPostalCode")
            )
    }
    )
    private Address billingAddress;
    private String trackingNumber;
    private Date updateAt;

}

