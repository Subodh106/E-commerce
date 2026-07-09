package com.backend.demo.Dto.auth;

import com.backend.demo.Dto.user.UserResponseDto;
import com.backend.demo.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginUserResponseDto {
    private String message;
    private UserResponseDto user;
}
