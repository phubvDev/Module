package com.avansoft.module_java_remake.factory;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    public User createUserFromDTO(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }

    public UserDTO createDTOFromUser(User user) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }
}