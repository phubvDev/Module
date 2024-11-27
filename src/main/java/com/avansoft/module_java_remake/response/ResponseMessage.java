package com.avansoft.module_java_remake.response;

public class ResponseMessage {
    private String status;

    public ResponseMessage(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
