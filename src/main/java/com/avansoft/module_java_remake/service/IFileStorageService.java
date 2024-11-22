package com.avansoft.module_java_remake.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileStorageService {
    String saveFile(MultipartFile file, String fileType) throws IOException;
}
