package com.avansoft.module_java_remake.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "users", schema = "module_test")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 191)
    private String name;

    @Column(name = "email", nullable = false, length = 191)
    private String email;

    @Lob
    @Column(name = "emailTitle")
    private String emailTitle;

    @Lob
    @Column(name = "emailNote")
    private String emailNote;

    @Column(name = "email_verified_at")
    private Instant emailVerifiedAt;

    @Column(name = "password")
    private String password;

    @Column(name = "remember_token", length = 100)
    private String rememberToken;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "level")
    private Integer level;

    @Column(name = "status")
    private Integer status;

    @Column(name = "user_id")
    private String userId;

    @Lob
    @Column(name = "address")
    private String address;

    @Lob
    @Column(name = "job")
    private String job;

    @Lob
    @Column(name = "note")
    private String note;

    @Column(name = "phone")
    private String phone;

    @Column(name = "referer_id")
    private String refererId;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "google_id")
    private String googleId;

    @Column(name = "facebook_id")
    private String facebookId;

    @Column(name = "naver_id")
    private String naverId;

    @Column(name = "kakao_id")
    private String kakaoId;

    @Column(name = "apple_id")
    private String appleId;

    @Column(name = "zipcode")
    private String zipcode;

    @Lob
    @Column(name = "withdrawal_reason")
    private String withdrawalReason;

    @Column(name = "withdrawal_date")
    private Instant withdrawalDate;

    @Column(name = "deleted_at")
    private Instant deletedAt;

}