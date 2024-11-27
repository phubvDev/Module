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

        // Cấu hình CORS, cho phép origin của frontend
        config.addAllowedOrigin("http://localhost:5173"); // Chỉ cho phép truy cập từ localhost:5173 (frontend)
        config.addAllowedMethod("*"); // Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE...)
        config.addAllowedHeader("*"); // Cho phép tất cả các header
        config.setAllowCredentials(true); // Cho phép gửi cookie trong request (nếu cần)

        // Cấu hình nguồn CORS và đăng ký CORS với tất cả các URL (/**)
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Đăng ký cấu hình CORS cho tất cả các URL

        return new CorsFilter(source); // Trả về đối tượng CorsFilter đã cấu hình
    }
}
