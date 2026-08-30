package com.backend.demo.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
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
            throws ServletException, IOException{
        final String authHeader = request.getHeader("Authorization");

        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        try{
            String jwt = authHeader.substring(7);
            Long userID = jwtService.extractClaims(jwt ,claims ->claims.get("userId",Long.class));
            if(SecurityContextHolder.getContext().getAuthentication() == null
            ){
                if(jwtService.isTokenValid(jwt)){
                    CustomUserPrincipal principal = new CustomUserPrincipal(userID);
                    Authentication auth = new UsernamePasswordAuthenticationToken(principal,null, List.of());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }


        }catch (Exception ex){
            SecurityContextHolder.clearContext();
            try {
                throw new Exception(ex.getMessage());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        filterChain.doFilter(request,response);
    }


}
