package com.backend.demo.Entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    private String full_name;
    private String phone_number;
    private String street;
    private String city;
    private String postal_code;
}
