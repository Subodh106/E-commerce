package com.backend.demo.Security;

import io.jsonwebtoken.Claims;
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

        final Cookie[] cookies = request.getCookies();

        String jwts = null;

        if (cookies==null || cookies.length==0) {
            filterChain.doFilter(request, response);
            return;
        }


        for(Cookie cookie : cookies){
            if("token".equals(cookie.getName())) {
                jwts = cookie.getValue();
                break;
            }
        }
        if(jwts == null){
            filterChain.doFilter(request,response);
            return;
        }
        try {
            Claims claims = jwtService.extractAllClaims(jwts);
            Long userID = Long.valueOf(claims.getSubject());
            if (SecurityContextHolder.getContext().getAuthentication() == null
            ) {
                if (jwtService.isTokenValid(jwts)) {
                    CustomUserPrincipal principal = new CustomUserPrincipal(userID);
                    Authentication auth = new UsernamePasswordAuthenticationToken(principal, null, List.of());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }

        } catch (Exception ex) {
            SecurityContextHolder.clearContext();
           response.sendError(HttpServletResponse.SC_UNAUTHORIZED, STR."jwt authorization failed: \{ex.getMessage()}");
        }

        filterChain.doFilter(request, response);
    }


}
