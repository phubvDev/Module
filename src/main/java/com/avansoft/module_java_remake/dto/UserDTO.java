package com.avansoft.module_java_remake.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String emailTitle;
    private String emailNote;
    private LocalDateTime emailVerifiedAt;
    private String password;
    private String rememberToken;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int level;
    private int status;
    private String userId;
    private String address;
    private String job;
    private String note;
    private String phone;
    private String refererId;
    private String detailAddress;
    private String googleId;
    private String facebookId;
    private String naverId;
    private String kakaoId;
    private String appleId;
    private String zipcode;
    private String withdrawalReason;
    private LocalDateTime withdrawalDate;
    private LocalDateTime deletedAt;
}
