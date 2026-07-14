package com.backend.demo.Dto.User;

import com.backend.demo.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
