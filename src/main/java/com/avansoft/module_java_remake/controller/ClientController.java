package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.sdi.ClientSdi;
import com.avansoft.module_java_remake.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${API_BASE_URL}/client")
public class ClientController {
    @Autowired
    private IClientService clientService;

    @PostMapping(value = "create")
    public ResponseEntity<Boolean> create(
            @RequestBody ClientSdi sdi
    ) {
        return ResponseEntity.ok(clientService.create(sdi));
    }
}
