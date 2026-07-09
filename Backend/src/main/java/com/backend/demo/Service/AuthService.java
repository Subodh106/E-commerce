package com.backend.demo.Service;

import com.backend.demo.Dto.AuthResponseDto;
import com.backend.demo.Dto.RegisterUserDto;
import com.backend.demo.Entities.Role;
import com.backend.demo.Entities.User;
import com.backend.demo.Repository.UserRepository;
import com.backend.demo.Security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponseDto registerUser(RegisterUserDto registerUserDto){
        if(userRepository.existsByEmail(registerUserDto.getEmail())){
            throw new RuntimeException("Email Already Exist");
        }
        if(userRepository.existsByUsername(registerUserDto.getUsername())){
            throw new RuntimeException("Username Already Exist");
        }
        User user = new User();
        user.setEmail(registerUserDto.getEmail());

        user.setUsername(registerUserDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        user.setRole(Role.USER);
        User savedUser  = userRepository.save(user);
        String token = jwtService.generateJwtToken(savedUser);
        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setToken(token);
        authResponseDto.setUser(savedUser.getId(),savedUser.getUsername(),savedUser.getEmail(),savedUser.getRole());
        return authResponseDto;
    }
}
