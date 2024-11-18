package com.avansoft.module_java_remake.response;

/**
 * DTO để trả về kết quả xác minh.
 *
 * @since 11
 */
public class VerifyCodeResponse {

    private boolean success;
    private String message;

    public VerifyCodeResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Getters và Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
