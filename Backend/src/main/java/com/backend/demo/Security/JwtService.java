package com.backend.demo.Security;

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

@Service
public class JwtService {

//    @Value("${app.jwt.secret}")
//    private String jwtSecret;

    private SecretKey getKey(){
        String jwtSecret = "dsfsdfsfsdfsdfsdfsdfsdfsd";
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_16));
    }

    public String generateJwtToken(Long id ){
        return  Jwts.builder()
                .subject(String.valueOf(id))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+(1000L*60*60*60)))
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


    public Claims extractAllClaims(String token){
        return  Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
    }

}
