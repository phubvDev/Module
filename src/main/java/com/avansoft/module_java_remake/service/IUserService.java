package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.UserDTO;
import java.util.Optional;
import java.util.List;

public interface IUserService {
        UserDTO registerUser(UserDTO userDTO);
        Optional<UserDTO> getUserById(Long id);
        UserDTO updateUser(Long id, UserDTO userDetails);
        void deleteUser(Long id);
        void hardDeleteUser(Long id);
        Optional<UserDTO> findByEmail(String email);
        Optional<UserDTO> findByPhone(String phone);
        List<UserDTO> getAllUsers();
        boolean checkPassword(String rawPassword, String encryptedPassword);
        Optional<UserDTO> findByUserId(String userId);
        boolean checkUserExists(String userId);
}
