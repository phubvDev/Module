package com.avansoft.module_java_remake.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

/**
 * DTO để nhận thông tin xác minh từ client.
 *
 * @since 11
 */
public class VerifyCodeRequest {

    @NotNull(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotNull(message = "Code is required")
    private String code;

    // Getters và Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
