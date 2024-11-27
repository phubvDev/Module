package com.avansoft.module_java_remake.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173"); // Cho phép origin của frontend
        config.addAllowedOrigin("http://13.124.14.236"); // Cho phép origin của frontend
        config.addAllowedMethod("*"); // Cho phép tất cả các method (GET, POST, etc.)
        config.addAllowedHeader("*"); // Cho phép tất cả các header
        config.setAllowCredentials(true); // Cho phép gửi cookie

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
