package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.entity.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@Qualifier("emailConfirmationUserService")
public class EmailConfirmationUserService extends UserServiceDecorator {

    public EmailConfirmationUserService(UserServiceImpl userService) {
        super(userService);
    }

    @Override
    public User createUser(User user) {
        User createdUser = super.createUser(user);
        sendConfirmationEmail(createdUser);
        return createdUser;
    }

    private void sendConfirmationEmail(User user) {
        System.out.println("Sending confirmation email to " + user.getEmail());
    }
}

