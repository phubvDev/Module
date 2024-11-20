package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.factory.UserFactory;
import com.avansoft.module_java_remake.repository.IUserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.avansoft.module_java_remake.exception.UserNotFoundException;

import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Primary
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private UserFactory userFactory;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDTO registerUser(UserDTO userDTO) {
        // Kiểm tra email đã tồn tại
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email đã tồn tại.");
        }

        // Kiểm tra userId đã tồn tại
        if (userRepository.findByUserId(userDTO.getUserId()).isPresent()) {
            throw new IllegalArgumentException("User ID đã tồn tại.");
        }

        // Tạo entity từ DTO
        User user = userFactory.createUserFromDTO(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Lưu entity vào DB
        User savedUser = userRepository.save(user);

        // Trả về DTO sau khi lưu
        return userFactory.createDTOFromUser(savedUser);
    }
    @Override
    public boolean checkUserExists(String userId) {
        // Kiểm tra xem userId có tồn tại trong cơ sở dữ liệu không
        return userRepository.findByUserId(userId).isPresent(); // Trả về true nếu có người dùng, false nếu không có
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
