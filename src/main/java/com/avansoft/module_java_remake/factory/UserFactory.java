package com.avansoft.module_java_remake.factory;

import com.avansoft.module_java_remake.dto.UserDTO;
import com.avansoft.module_java_remake.entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {

    /**
     * Tạo một entity User từ UserDTO.
     * Áp dụng các xử lý đặc biệt nếu cần.
     *
     * @param userDTO DTO chứa thông tin người dùng
     * @return Entity User
     */
    public User createUserFromDTO(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);

        // Các xử lý đặc biệt
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail().trim().toLowerCase()); // Normalize email
        }
        if (userDTO.getName() != null) {
            user.setName(userDTO.getName().trim()); // Loại bỏ khoảng trắng thừa
        }

        return user;
    }

    /**
     * Tạo một DTO User từ Entity User.
     * Áp dụng các xử lý đặc biệt nếu cần.
     *
     * @param user Entity User
     * @return DTO UserDTO
     */
    public UserDTO createDTOFromUser(User user) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);

        // Các xử lý đặc biệt
        if (user.getEmail() != null) {
            userDTO.setEmail(user.getEmail().toLowerCase()); // Email luôn ở dạng chữ thường
        }

        return userDTO;
    }
}
