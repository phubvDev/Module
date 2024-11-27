package com.avansoft.module_java_remake.dto;

public class ForgotPasswordRequest {
    private String userId;
    private String email;

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }
}