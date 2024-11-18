package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.EmailVerifyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IEmailVerifyCodeRepository extends JpaRepository<EmailVerifyCode, Long> {
    Optional<EmailVerifyCode> findByEmailAndCode(String email, String code);
    void deleteByEmail(String email);
}
