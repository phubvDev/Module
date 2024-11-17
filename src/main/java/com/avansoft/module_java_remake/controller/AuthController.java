package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.service.IUserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("${API_BASE_URL}/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final IUserService userService;
    public AuthController(@Qualifier("userServiceImpl") IUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserDTO userDTO) {
        Optional<UserDTO> user = userService.findByUserId(userDTO.getUserId());

        if (user.isPresent() && userService.checkPassword(userDTO.getPassword(), user.get().getPassword())) {

            String token = Jwts.builder()
                    .setSubject(user.get().getUserId())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 864_000_000))
                    .signWith(SignatureAlgorithm.HS256, "secretKey")
                    .compact();


            Map<String, String> response = new HashMap<>();
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}
