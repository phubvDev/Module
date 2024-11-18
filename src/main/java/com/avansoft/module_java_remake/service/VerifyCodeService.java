package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.repository.IEmailVerifyCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VerifyCodeService {

    @Autowired
    private IEmailVerifyCodeRepository emailVerifyCodeRepository;

    public boolean verifyCode(String email, String code) {
        return emailVerifyCodeRepository.findByEmailAndCode(email, code)
                .filter(verifyCode -> verifyCode.getExpiredAt().isAfter(LocalDateTime.now()))
                .isPresent();
    }
}
