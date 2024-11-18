package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.service.VerifyCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${API_BASE_URL}/verify-code")
public class VerifyCodeController {

    @Autowired
    private VerifyCodeService verifyCodeService;

    @PostMapping
    public ResponseEntity<Boolean> verifyCode(
            @RequestParam String email,
            @RequestParam String code
    ) {
        boolean isValid = verifyCodeService.verifyCode(email, code);
        return ResponseEntity.ok(isValid);
    }
}
