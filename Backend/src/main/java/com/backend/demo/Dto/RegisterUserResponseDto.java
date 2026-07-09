package com.backend.demo.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserResponseDto {
    private String message;
    private UserResponseDto user;

    public RegisterUserResponseDto(String message , UserResponseDto user){
        this.message=message;
        this.user = user;
    }
}
