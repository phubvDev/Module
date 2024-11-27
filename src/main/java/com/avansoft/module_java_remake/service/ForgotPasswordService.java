package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.ForgotPasswordRequest;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Xử lý yêu cầu quên mật khẩu
    public void handleForgotPassword(ForgotPasswordRequest request) throws Exception {
        String userId = request.getUserId();
        String email = request.getEmail();

        // 1. Kiểm tra xem userId và email có tồn tại trong cơ sở dữ liệu không
        Optional<User> userOptional = userRepository.findByUserIdAndEmail(userId, email);

        // Thay đổi isEmpty() thành !isPresent() để tương thích với Java 8
        if (!userOptional.isPresent()) {
            throw new Exception("Invalid userId or email");
        }

        User user = userOptional.get();

        // 2. Tạo một mã mật khẩu tạm thời ngẫu nhiên
        String tempPassword = generateRandomPassword();

        // 3. Mã hóa mật khẩu tạm thời
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(tempPassword);

        // 4. Lưu mật khẩu đã mã hóa vào DB
        user.setPassword(hashedPassword);
        userRepository.save(user);

        // 5. Gửi email với mật khẩu tạm thời
        sendTemporaryPasswordEmail(email, tempPassword);
    }

    // Tạo mật khẩu tạm thời 6 chữ số
    private String generateRandomPassword() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000)); // Tạo mật khẩu 6 chữ số
    }

    // Gửi email với mật khẩu tạm thời
    private void sendTemporaryPasswordEmail(String email, String tempPassword) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("임시 비밀번호 안내");
            message.setText("여러분의 임시 비밀번호는 " + tempPassword + " 입니다.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email.");
        }
    }
}
