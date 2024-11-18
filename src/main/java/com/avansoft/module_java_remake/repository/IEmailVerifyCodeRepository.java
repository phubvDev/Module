package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.EmailVerifyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository cho thực thể EmailVerifyCode.
 *
 * @since 8
 */
public interface IEmailVerifyCodeRepository extends JpaRepository<EmailVerifyCode, Long> {

    /**
     * Tìm kiếm mã xác minh theo email và code.
     *
     * @param email Email của người dùng.
     * @param code Mã xác minh.
     * @return Một Optional chứa mã xác minh nếu tồn tại.
     * @since 8
     */
    Optional<EmailVerifyCode> findByEmailAndCode(String email, String code);

    /**
     * Xóa tất cả các mã xác minh đã hết hạn.
     *
     * @param now Thời gian hiện tại.
     * @return Số lượng bản ghi đã bị xóa.
     * @since 8
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM EmailVerifyCode e WHERE e.expiredAt < :now")
    int deleteAllByExpiredAtBefore(LocalDateTime now);
}
