package com.backend.demo.Dto.User;

import com.backend.demo.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSummaryDto {
    private long id;
    private String username;
    private Role role;
}
