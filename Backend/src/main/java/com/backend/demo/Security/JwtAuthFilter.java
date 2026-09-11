package com.backend.demo.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        Cookie[] cookies = request.getCookies();

        String jwts = null;

        System.out.println(Arrays.toString(cookies));

        for(Cookie cookie : cookies){
            if("token".equals(cookie.getName())) {
                jwts = cookie.getValue();
                System.out.println(jwts);
                break;
            }
        }
        if (jwts == null) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            Long userID = jwtService.extractClaims(jwts, claims -> claims.get("userId", Long.class));
            if (userID != null && SecurityContextHolder.getContext().getAuthentication() == null
            ) {
                    CustomUserPrincipal principal = new CustomUserPrincipal(userID);
                    Authentication auth = new UsernamePasswordAuthenticationToken(principal, null, List.of());
                    SecurityContextHolder.getContext().setAuthentication(auth);
            }


        } catch (Exception ex) {
            SecurityContextHolder.clearContext();
            throw new RuntimeException(STR."Jwt Authentication failed: \{ex.getMessage()}",ex);
        }

        filterChain.doFilter(request, response);
    }


}
