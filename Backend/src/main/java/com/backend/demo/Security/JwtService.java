package com.backend.demo.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    private SecretKey getKey(){
        String jwtSecret = "f9d0a7d9b8dbe1cb8c3d84e2a7c62ab9f0a72d67c9a81de";
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateJwtToken(UserDetails userDetails){
        return  Jwts.builder().subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()*1000*60*15))
                .signWith(getKey())
                .compact();
    }

    public boolean isTokenValid(String email , UserDetails userDetails){
        return email.equals(userDetails.getUsername());
    }

    public Claims extractClaims(String Token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(Token)
                .getPayload();
    }
}
