package com.backend.demo.Dto;

import com.backend.demo.Entities.Role;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private UserResponseDto user;

    public AuthResponseDto() {

    }

    public void setUser(Long id, String username, String email, Role role) {
    }
}
