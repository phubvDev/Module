package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRememberToken(userDetails.getRememberToken());
        user.setLevel(userDetails.getLevel());
        user.setStatus(userDetails.getStatus());
        user.setUserId(userDetails.getUserId());
        user.setAddress(userDetails.getAddress());
        user.setJob(userDetails.getJob());
        user.setNote(userDetails.getNote());
        user.setPhone(userDetails.getPhone());
        user.setDetailAddress(userDetails.getDetailAddress());
        user.setZipcode(userDetails.getZipcode());
        user.setWithdrawalReason(userDetails.getWithdrawalReason());
        user.setEmailVerifiedAt(userDetails.getEmailVerifiedAt());
        user.setWithdrawalDate(userDetails.getWithdrawalDate());
        user.setDeletedAt(userDetails.getDeletedAt());
        user.setReferer(userDetails.getReferer());
        user.setSocialAccounts(userDetails.getSocialAccounts());

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }
}
