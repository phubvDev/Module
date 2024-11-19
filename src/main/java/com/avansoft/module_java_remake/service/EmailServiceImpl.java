package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.DataMailDTO;
import com.avansoft.module_java_remake.dto.sdi.EmailSdi;
import com.avansoft.module_java_remake.utils.Const;
import com.avansoft.module_java_remake.utils.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailServiceImpl implements IEmailService {
    @Autowired
    private IMailService mailService;

    @Override
    public Boolean create(EmailSdi sdi) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);

            Map<String, Object> props = new HashMap<>();
            props.put("name", sdi.getName());
            props.put("username", sdi.getUsername());
            props.put("password", DataUtils.generateTempPwd(6));
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
            return true;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        return false;
    }
}
