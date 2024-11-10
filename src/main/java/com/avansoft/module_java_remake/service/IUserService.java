package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.entity.User;

import java.util.Optional;

public interface IUserService {
        User createUser(User user);
        Optional<User> getUserById(Long id);
        User updateUser(Long id, User userDetails);
        void deleteUser(Long id);
        Optional<User> findByEmail(String email);
        Optional<User> findByPhone(String phone);
}
