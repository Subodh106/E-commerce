package com.backend.demo.Security;

import com.backend.demo.Entities.User;
import com.backend.demo.Exception.Custom.ExpiredTokenException;
import com.backend.demo.Exception.Custom.MalformedTokenException;
import com.backend.demo.Exception.Custom.SignatureException;
import com.backend.demo.Exception.Custom.UnsupportedJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private SecretKey getKey(){
        String jwtSecret = "f9d0a7d9b8dbe1cb8c3d84e2a7c62ab9f0a72d67c9a81de";
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_16));
    }

    public String generateJwtToken(Long id  , User user){
        Map<String , Object> claims = new HashMap<>();
        claims.put("userID",id);
        return  Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000+60+15))
                .signWith(getKey())
                .compact();
    }

    public boolean isTokenValid(String token){
        try{
            Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token);
            return true;
        }catch (ExpiredJwtException ex){
          throw new ExpiredTokenException(ex.getMessage());
        }catch (MalformedTokenException ex){
            throw new MalformedTokenException(ex.getMessage());
        }catch (SignatureException ex){
            throw new SignatureException(ex.getMessage());
        }catch (UnsupportedJwtException ex){
            throw new UnsupportedJwtException(ex.getMessage());
        }catch (IllegalArgumentException ex){
           throw new IllegalArgumentException(ex.getMessage());
        }
    }

    public <T> T extractClaims(String Token , Function<Claims , T> resolver){
        return  resolver.apply(extractAllClaims(Token));
    }

    public Claims extractAllClaims(String token){
        return  Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
    }

}
