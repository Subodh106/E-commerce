package com.backend.demo.Security;

import com.backend.demo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CostumeUserDetailsService implements UserDetailsService {
    private  final UserRepository userRepository;

    @Override
    @lombok.NonNull
    public UserDetails loadUserByUsername(@NonNull String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}

