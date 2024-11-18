package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.DataMailDTO;
import com.avansoft.module_java_remake.entity.EmailVerifyCode;
import com.avansoft.module_java_remake.repository.IEmailVerifyCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class MailServiceImpl implements IMailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private IEmailVerifyCodeRepository emailVerifyCodeRepository;

    @Override
    public void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException {

        String verificationCode = generateVerificationCode();


        EmailVerifyCode verifyCode = new EmailVerifyCode();
        verifyCode.setEmail(dataMail.getTo());
        verifyCode.setCode(verificationCode);
        verifyCode.setExpiredAt(LocalDateTime.now().plusMinutes(10));
        emailVerifyCodeRepository.save(verifyCode);


        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariable("name", dataMail.getProps().get("name"));
        context.setVariable("username", dataMail.getProps().get("username"));
        context.setVariable("password", verificationCode);

        String html = templateEngine.process(templateName, context);

        helper.setTo(dataMail.getTo());
        helper.setSubject(dataMail.getSubject());
        helper.setText(html, true);

        mailSender.send(message);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }
}
