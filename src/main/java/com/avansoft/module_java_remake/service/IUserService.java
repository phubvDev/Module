package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.entity.User;

public interface IUserService {
        User createUser(User user);
        User getUserById(Long id);
        User updateUser(Long id, User userDetails);
        void deleteUser(Long id);
}
