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
//@NoArgsConstructor
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
    private String shipping_address;
    private String billing_address;
    private String tracking_number;
    private Date update_at;
    @OneToMany
    private List<OrderItem> order_item = new ArrayList<>();
}
