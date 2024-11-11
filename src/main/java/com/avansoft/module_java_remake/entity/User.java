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

    @Lob
    private String emailTitle;  // longtext

    @Lob
    private String emailNote;  // longtext

    @Size(min = 8)
    @ToString.Exclude
    private String password;

    private String rememberToken;

    private int level;
    private int status;

    @NotNull
    @Column(name = "user_id")
    private String userId;

    @Lob
    private String address;

    @Lob
    private String job;

    @Lob
    private String note;

    private String phone;

    @Column(name = "referer_id")
    private String refererId;

    @Column(name = "detail_address")
    private String detailAddress;

    private String googleId;
    private String facebookId;
    private String naverId;
    private String kakaoId;
    private String appleId;

    private String zipcode;

    @Column(name = "withdrawal_reason")
    @Lob
    private String withdrawalReason;

    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;

    @Column(name = "withdrawal_date")
    private LocalDateTime withdrawalDate;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "referer_id", insertable = false, updatable = false)
    private User referer;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
