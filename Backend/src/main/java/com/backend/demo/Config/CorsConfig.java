package com.backend.demo.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig{
    @Bean
    CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.allowed-origin}")String allowedOrigin){
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> origin = Arrays.stream(allowedOrigin.split(","))
                .map(String::trim)
                .filter(s->!s.isEmpty())
                .toList();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(origin);
        configuration.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE1"));
        configuration.setMaxAge(3600L);
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**" , configuration);
        return source;
    }
}
