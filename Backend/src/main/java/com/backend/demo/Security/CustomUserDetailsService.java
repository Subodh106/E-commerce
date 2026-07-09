package com.backend.demo.Security;

import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private  final UserRepository userRepository;

    @Override
    public @Nullable UserDetails loadUserByUsername(@NonNull String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("User doesn't exist with "+email));
    }
}

