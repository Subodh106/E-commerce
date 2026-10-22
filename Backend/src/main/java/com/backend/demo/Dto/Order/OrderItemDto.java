package com.backend.demo.Dto.Order;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class OrderItemDto {
    private Long[] cartItemId;
    private String fullName;
    private String phoneNumber;
    private String city;
    private String street;
    private String postalCode;
}
