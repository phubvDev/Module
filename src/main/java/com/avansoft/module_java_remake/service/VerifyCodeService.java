package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.response.VerifyCodeResponse;
import com.avansoft.module_java_remake.entity.EmailVerifyCode;
import com.avansoft.module_java_remake.repository.IEmailVerifyCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Dịch vụ hỗ trợ xác minh mã và quản lý mã xác minh đã hết hạn.
 *
 * @since 8
 */
@Service
public class VerifyCodeService {

    @Autowired
    private IEmailVerifyCodeRepository emailVerifyCodeRepository;

    /**
     * Xác minh mã xác minh và kiểm tra thời hạn sử dụng.
     *
     * @param email Email của người dùng.
     * @param code Mã xác minh cần kiểm tra.
     * @return Thông báo xác minh mã (thành công hoặc lỗi).
     * @since 8
     */
    public VerifyCodeResponse verifyCode(String email, String code) {
        Optional<EmailVerifyCode> verifyCode = emailVerifyCodeRepository.findByEmailAndCode(email, code);

        if (!verifyCode.isPresent()) {
            return new VerifyCodeResponse(false, "Verification code not found for email: " + email);
        }

        if (verifyCode.get().getExpiredAt().isBefore(LocalDateTime.now())) {
            return new VerifyCodeResponse(false, "Verification code expired for email: " + email);
        }

        return new VerifyCodeResponse(true, "Verification successful for email: " + email);
    }

    /**
     * Xóa tất cả các mã xác minh đã hết hạn.
     *
     * @return Số lượng mã xác minh đã được xóa.
     * @since 8
     */
    public int deleteExpiredCodes() {
        int deletedCount = emailVerifyCodeRepository.deleteAllByExpiredAtBefore(LocalDateTime.now());
        System.out.println("Deleted " + deletedCount + " expired verification codes.");
        return deletedCount;
    }
}
