package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.sdi.EmailSdi;
import com.avansoft.module_java_remake.service.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${API_BASE_URL}/email")
public class EmailController {
    @Autowired
    private IEmailService EmailService;

    @PostMapping(value = "create")
    public ResponseEntity<Boolean> create(
            @RequestBody EmailSdi sdi
    ) {
        return ResponseEntity.ok(EmailService.create(sdi));
    }
}
