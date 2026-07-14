package com.backend.demo.Dto.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSummaryDto {
    private long id;
    private String username;
}
