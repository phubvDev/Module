package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.entity.User;

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
    public User getUserById(Long id) {
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
}

