package com.backend.demo.Service;

import com.backend.demo.Dto.RegisterUserResponseDto;
import com.backend.demo.Dto.RegisterUserDto;
import com.backend.demo.Entities.Role;
import com.backend.demo.Entities.User;
import com.backend.demo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public RegisterUserResponseDto registerUser(RegisterUserDto registerUserDto){
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
        User savedUser = userRepository.save(user);
        return new RegisterUserResponseDto(savedUser.getId(),savedUser.getUsername(),savedUser.getEmail(),savedUser.getRole());
    }
}
