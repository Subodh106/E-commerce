package com.backend.demo.Dto;

import com.backend.demo.Entities.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterUserResponseDto {
    private Long id;
    @NotBlank(message = "Username can't be empty")
    private String username;
    @NotBlank(message = "Email can't be empty")
    private String email;
    private Role role;
}
