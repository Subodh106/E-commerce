package com.backend.demo.Service;

import com.backend.demo.Dto.auth.AuthResponseDto;
import com.backend.demo.Dto.auth.LoginUserDto;
import com.backend.demo.Dto.auth.RegisterUserDto;
import com.backend.demo.Entities.Role;
import com.backend.demo.Entities.User;
import com.backend.demo.Exception.Custom.InvalidCredentialsException;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Exception.Custom.DuplicatedValueException;
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
            throw new DuplicatedValueException("Email Already Exist");
        }
        if(userRepository.existsByUsername(registerUserDto.getUsername())){
            throw new DuplicatedValueException("Username Already Exist");
        }
        User user = new User();
        user.setEmail(registerUserDto.getEmail());

        user.setUsername(registerUserDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        user.setRole(Role.USER);
        User savedUser  = userRepository.save(user);
        String token = jwtService.generateJwtToken(savedUser);

       return buildAuthResponse(savedUser ,token);
    }

    public AuthResponseDto loginUser(LoginUserDto loginUserDto){
        User user = userRepository.findByEmail(loginUserDto.getEmail()).orElseThrow(()->new ResourceNotFoundException("User doesn't exist"));
        boolean isPasswordValid = passwordEncoder.matches(loginUserDto.getPassword(),user.getPassword());
        if(!isPasswordValid) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
        String token = jwtService.generateJwtToken(user);
       return buildAuthResponse(user,token);
    }

    private AuthResponseDto buildAuthResponse(User user, String token) {
        AuthResponseDto response = new AuthResponseDto();
        response.setToken(token);
        response.setUser(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
        return response;
    }
}
