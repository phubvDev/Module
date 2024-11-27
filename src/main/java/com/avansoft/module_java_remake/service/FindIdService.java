package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.FindIdRequest;
import com.avansoft.module_java_remake.dto.ForgotPasswordRequest;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;

@Service
public class FindIdService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void handleFindId(FindIdRequest request) throws MessagingException {
        String name = request.getName();
        String email = request.getEmail();

        // Kiểm tra người dùng có tồn tại không
        Optional<User> userOptional = userRepository.findByNameAndEmail(name, email);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("Không tìm thấy tài khoản với thông tin này.");
        }

        User user = userOptional.get();
        String userId = user.getUserId();

        // Gửi email chứa user_id
        sendUserIdEmail(email, userId);
    }

    private void sendUserIdEmail(String email, String userId) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

        messageHelper.setTo(email);
        messageHelper.setSubject("Thông tin tài khoản");

        String htmlContent = "<html><body>"
                + "<h3>Chào bạn,</h3>"
                + "<p>Chúng tôi đã nhận được yêu cầu tìm ID tài khoản của bạn.</p>"
                + "<p>user_id của bạn là: <strong>" + userId + "</strong></p>"
                + "<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>"
                + "<p><i>Đội ngũ hỗ trợ khách hàng</i></p>"
                + "</body></html>";

        messageHelper.setText(htmlContent, true);
        mailSender.send(mimeMessage);
    }
}
