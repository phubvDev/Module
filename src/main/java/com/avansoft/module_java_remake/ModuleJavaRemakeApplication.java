package com.avansoft.module_java_remake;

import com.avansoft.module_java_remake.repository.IBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ModuleJavaRemakeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ModuleJavaRemakeApplication.class, args);
    }

}
