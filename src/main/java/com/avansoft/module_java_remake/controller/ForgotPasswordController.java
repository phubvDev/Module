package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.ForgotPasswordRequest;
import com.avansoft.module_java_remake.response.ResponseMessage;
import com.avansoft.module_java_remake.service.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${API_BASE_URL}/auth")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<ResponseMessage> resetPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            // Call service to handle password reset logic
            forgotPasswordService.handleForgotPassword(request);
            return ResponseEntity.ok(new ResponseMessage("Mật khẩu tạm thời đã được gửi qua email."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessage("Vui lòng kiểm tra ID và email."));
        }
    }
}
