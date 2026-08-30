package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.User.UserResponseDto;
import com.backend.demo.Security.CustomUserPrincipal;
import com.backend.demo.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDto>> getMe(@AuthenticationPrincipal CustomUserPrincipal customUserPrincipal){
       Long userId = customUserPrincipal.getId();
       UserResponseDto user = userService.getMe(userId);
        ApiResponse<UserResponseDto> userResponseDto = new ApiResponse<>("User fetched successfully",user);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }
}
