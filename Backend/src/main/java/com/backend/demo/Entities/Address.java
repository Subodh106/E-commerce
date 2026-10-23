package com.backend.demo.Entities;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Embeddable
@RequiredArgsConstructor
@Getter
@Setter
public class Address {
    private String fullName;
    private String phoneNumber;
    private String city;
    private String street;
    private String postalCode;

}
