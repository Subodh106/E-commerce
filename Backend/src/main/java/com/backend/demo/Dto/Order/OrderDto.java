package com.backend.demo.Dto.Order;

import com.backend.demo.Dto.Address.AddressDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class OrderDto {
    private Long[] cartItemId;
    private AddressDto billingAddress;
    private AddressDto shippingAddress;
}
