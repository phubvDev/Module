package com.avansoft.module_java_remake.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService implements IFileStorageService {
    private static final Dotenv dotenv = Dotenv.configure().filename("dev.env").load();
    private static final String BASE_DIRECTORY = dotenv.get("BASE_DIRECTORY_PATH");

    @Override
    public String saveFile(MultipartFile file, String fileType) throws IOException {
        System.out.println("Filetype: " + fileType);

        // Xác định thư mục con dựa trên loại file
        String subDir = determineSubDirectory(fileType);
        Path directoryPath = Paths.get(BASE_DIRECTORY, subDir);

        // Tạo thư mục nếu chưa tồn tại
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        // Tạo tên file duy nhất
        String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
        Path filePath = directoryPath.resolve(uniqueFileName);

        // Lưu file vào hệ thống
        file.transferTo(filePath.toFile());

        // Trả về đường dẫn của file
        return filePath.toString();
    }

    // Tạo tên file duy nhất
    private String generateUniqueFileName(String originalFileName) {
        String fileExtension = "";
        int lastDotIndex = originalFileName.lastIndexOf('.');
        if (lastDotIndex > 0) {
            fileExtension = originalFileName.substring(lastDotIndex);
        }
        return System.currentTimeMillis() + "_" + UUID.randomUUID() + fileExtension;
    }

    // Xác định thư mục dựa trên loại file
    private String determineSubDirectory(String fileType) {
        switch (fileType) {
            case "attachment":
                return "attach";
            case "thumbnail":
                return "thumbnail";
            case "images":
                return "images";
            default:
                return "others";
        }
    }
}
