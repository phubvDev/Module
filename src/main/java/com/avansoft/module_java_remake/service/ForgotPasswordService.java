package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.ForgotPasswordRequest;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void handleForgotPassword(ForgotPasswordRequest request) throws Exception {
        String userId = request.getUserId();
        String email = request.getEmail();

        // 1. Kiểm tra xem userId và email có tồn tại trong cơ sở dữ liệu không
        Optional<User> userOptional = userRepository.findByUserIdAndEmail(userId, email);
        if (!userOptional.isPresent()) { // Dùng isPresent() thay vì isEmpty()
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
        return String.format("%06d", random.nextInt(1000000));
    }

    // Gửi email với mật khẩu tạm thời (HTML Email)
    private void sendTemporaryPasswordEmail(String email, String tempPassword) {
        try {
            // Tạo đối tượng MimeMessage từ JavaMailSender
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            // Sử dụng MimeMessageHelper để hỗ trợ gửi email HTML
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true); // true để hỗ trợ HTML content

            // Đặt người nhận và chủ đề email
            messageHelper.setTo(email);
            messageHelper.setSubject("Hướng dẫn lấy lại mật khẩu");

            // Nội dung email dưới dạng HTML (Tiếng Việt)
            String htmlContent = "<html><body>"
                    + "<h3>Chào bạn,</h3>"
                    + "<p>Chúng tôi đã nhận được yêu cầu lấy lại mật khẩu cho tài khoản của bạn.</p>"
                    + "<p>Mật khẩu tạm thời của bạn là: <strong>" + tempPassword + "</strong></p>"
                    + "<p>Hãy sử dụng mật khẩu này để đăng nhập vào hệ thống và đổi mật khẩu của bạn.</p>"
                    + "<p>Chúng tôi khuyến cáo bạn thay đổi mật khẩu ngay sau khi đăng nhập để đảm bảo bảo mật tài khoản.</p>"
                    + "<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>"
                    + "<p><i>Đội ngũ hỗ trợ khách hàng</i></p>"
                    + "</body></html>";

            // Cấu hình nội dung email là HTML
            messageHelper.setText(htmlContent, true); // true để chỉ định đây là email HTML

            // Gửi email
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send HTML email.");
        }
    }
}
