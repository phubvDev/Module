package com.avansoft.module_java_remake.config;

import com.avansoft.module_java_remake.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() // Chỉ cần gọi một lần
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/auth/login", "/api/avansoft/module/auth/login","/api/avansoft/module/users/register","/api/avansoft/module/email/create","/api/avansoft/module/users/check-username").permitAll() // Cho phép các endpoint login không cần xác thực
                .anyRequest().authenticated() // Tất cả các request khác đều cần xác thực
                .and()
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class) // Thêm filter xác thực JWT
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS); // Chế độ Stateless để không sử dụng session
        System.out.println("Security Configuration applied successfully");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Cung cấp PasswordEncoder để mã hóa mật khẩu
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(); // Cung cấp JwtAuthenticationFilter để kiểm tra token
    }
}
