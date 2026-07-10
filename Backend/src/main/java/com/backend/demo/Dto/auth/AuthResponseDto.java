package com.backend.demo.Dto.auth;

import com.backend.demo.Dto.user.UserResponseDto;
import com.backend.demo.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private UserResponseDto user;

    public AuthResponseDto() {

    }

    public void setUser(Long id, String username, String email) {
        this.user = new UserResponseDto(id,username,email,Role.USER);
    }
}
