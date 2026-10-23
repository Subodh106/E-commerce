package com.backend.demo.Dto.Address;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AddressDto {
    private String fullName;
    private String phoneNumber;
    private String city;
    private String street;
    private String postalCode;
}
