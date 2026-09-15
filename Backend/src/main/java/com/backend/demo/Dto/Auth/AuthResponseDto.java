package com.backend.demo.Dto.Auth;

import com.backend.demo.Dto.User.UserResponseDto;
import com.backend.demo.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AuthResponseDto {
    private String token;
    private UserResponseDto user;



    public void setUser(Long id, String username, String email) {
        this.user = new UserResponseDto(id,username,email,Role.USER);
    }
}
