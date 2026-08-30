package com.backend.demo.Service;

import com.backend.demo.Dto.User.UserResponseDto;
import com.backend.demo.Entities.User;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponseDto getMe(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new UserResponseDto(user.getId(),user.getEmail(),user.getUsername(),user.getRole());
    }

}
