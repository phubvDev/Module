package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.factory.UserFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@Qualifier("emailConfirmationUserService")
public class EmailConfirmationUserService extends UserServiceDecorator {

    @Autowired
    public EmailConfirmationUserService(UserServiceImpl userService, UserFactory userFactory) {
        super(userService, userFactory);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        UserDTO createdUserDTO = super.createUser(userDTO);
        sendConfirmationEmail(createdUserDTO);
        return createdUserDTO;
    }

    private void sendConfirmationEmail(UserDTO userDTO) {
        System.out.println("Sending confirmation email to " + userDTO.getEmail());
    }
}
