package com.avansoft.module_java_remake.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 100)
    private String name;

    @NotNull
    @Email
    private String email;

    @Size(min = 8)
    @ToString.Exclude
    private String password;

    private String rememberToken;

    private int level;
    private int status;

    @NotNull
    private String userId;

    private String address;
    private String job;
    private String note;
    private String phone;
    private String detailAddress;
    private String zipcode;
    private String withdrawalReason;

    @Embedded
    private SocialAccounts socialAccounts;

    private LocalDateTime emailVerifiedAt;
    private LocalDateTime withdrawalDate;
    private LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "referer_id")
    private User referer;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class SocialAccounts {
    private String googleId;
    private String facebookId;
    private String naverId;
    private String kakaoId;
    private String appleId;
}
