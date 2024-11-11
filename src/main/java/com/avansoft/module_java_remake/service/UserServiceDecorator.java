package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.entity.User;
import java.util.Optional;

public class UserServiceDecorator implements IUserService {
    protected UserServiceImpl decoratedUserService;

    public UserServiceDecorator(UserServiceImpl userService) {
        this.decoratedUserService = userService;
    }

    @Override
    public User createUser(User user) {
        return decoratedUserService.createUser(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return decoratedUserService.getUserById(id);
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        return decoratedUserService.updateUser(id, userDetails);
    }

    @Override
    public void deleteUser(Long id) {
        decoratedUserService.deleteUser(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return decoratedUserService.findByEmail(email);
    }

    @Override
    public Optional<User> findByPhone(String phone) {
        return decoratedUserService.findByPhone(phone);
    }
}
