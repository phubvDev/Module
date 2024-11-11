package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.factory.UserFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
@Qualifier("userServiceDecorator")
public class UserServiceDecorator implements IUserService {

    protected final UserServiceImpl decoratedUserService;
    private final UserFactory userFactory;

    @Autowired
    public UserServiceDecorator(UserServiceImpl userService, UserFactory userFactory) {
        this.decoratedUserService = userService;
        this.userFactory = userFactory;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        return decoratedUserService.createUser(userDTO);
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return decoratedUserService.getUserById(id);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDetails) {
        return decoratedUserService.updateUser(id, userDetails);
    }

    @Override
    public void deleteUser(Long id) {
        decoratedUserService.deleteUser(id);
    }

    @Override
    public void hardDeleteUser(Long id) {
        decoratedUserService.hardDeleteUser(id);
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        return decoratedUserService.findByEmail(email);
    }

    @Override
    public Optional<UserDTO> findByPhone(String phone) {
        return decoratedUserService.findByPhone(phone);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return decoratedUserService.getAllUsers();
    }
}
