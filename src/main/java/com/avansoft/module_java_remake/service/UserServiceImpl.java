package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.factory.UserFactory;
import com.avansoft.module_java_remake.repository.IUserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.avansoft.module_java_remake.exception.UserNotFoundException;

import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private UserFactory userFactory;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userFactory.createUserFromDTO(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User savedUser = userRepository.save(user);
        return userFactory.createDTOFromUser(savedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userFactory::createDTOFromUser)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(userFactory::createDTOFromUser);
    }

    @Override
    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        BeanUtils.copyProperties(userDetails, user, "id", "password", "createdAt");

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return userFactory.createDTOFromUser(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setDeletedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void hardDeleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userFactory::createDTOFromUser);
    }

    @Override
    public Optional<UserDTO> findByPhone(String phone) {
        return userRepository.findByPhone(phone)
                .map(userFactory::createDTOFromUser);
    }
    @Override
    public boolean checkPassword(String rawPassword, String encryptedPassword) {
        return passwordEncoder.matches(rawPassword, encryptedPassword);
    }
    @Override
    public Optional<UserDTO> findByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .map(userFactory::createDTOFromUser);
    }
}
