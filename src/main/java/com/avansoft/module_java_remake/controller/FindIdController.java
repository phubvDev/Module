package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.FindIdRequest;
import com.avansoft.module_java_remake.dto.ForgotPasswordRequest;
import com.avansoft.module_java_remake.response.ResponseMessage;
import com.avansoft.module_java_remake.service.FindIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${API_BASE_URL}/auth")
public class FindIdController {

    @Autowired
    private FindIdService findIdService;

    @PostMapping("/find-id")
    public ResponseEntity<ResponseMessage> findUserId(@RequestBody FindIdRequest request) {
        try {
            // Gọi service để tìm user_id
            findIdService.handleFindId(request);
            return ResponseEntity.ok(new ResponseMessage("success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMessage("error"));
        }
    }
}
