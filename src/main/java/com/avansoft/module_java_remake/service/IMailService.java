package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.DataMailDTO;
import javax.mail.MessagingException;

public interface IMailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
