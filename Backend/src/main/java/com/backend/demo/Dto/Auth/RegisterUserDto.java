package com.backend.demo.Dto.Auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterUserDto {
    @NotBlank(message="Username can't be empty")
    private String username;
    @NotBlank(message="Email can't be empty")
    private String email;
    @NotBlank(message="Password can't be empty")
    private String password;
}
