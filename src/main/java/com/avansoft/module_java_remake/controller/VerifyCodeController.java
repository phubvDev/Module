package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.VerifyCodeRequest;
import com.avansoft.module_java_remake.response.VerifyCodeResponse;
import com.avansoft.module_java_remake.service.VerifyCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Controller để quản lý xác minh mã.
 *
 * @since 11
 */
@RestController
@RequestMapping("${API_BASE_URL}/verify-code")
public class VerifyCodeController {

    @Autowired
    private VerifyCodeService verifyCodeService;

    /**
     * Endpoint để xác minh mã xác minh.
     *
     * @param request Dữ liệu xác minh từ client.
     * @return Kết quả xác minh.
     * @since 11
     */
    @PostMapping
    public ResponseEntity<VerifyCodeResponse> verifyCode(@Valid @RequestBody VerifyCodeRequest request) {
        VerifyCodeResponse response = verifyCodeService.verifyCode(request.getEmail(), request.getCode());
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint để xóa tất cả mã xác minh đã hết hạn.
     *
     * @return Số lượng mã đã xóa.
     * @since 11
     */
    @DeleteMapping("/cleanup")
    public ResponseEntity<String> cleanupExpiredCodes() {
        int deletedCount = verifyCodeService.deleteExpiredCodes();
        return ResponseEntity.ok("Deleted " + deletedCount + " expired verification codes.");
    }
}
