package com.avansoft.module_java_remake.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardDTO {
    private Long id;

    @NotBlank(message = "Board ID can't be blank")
    @Size(max = 255, message = "Board ID must be less than 255 characters")
    private String boardId;

    @NotNull(message = "Type can't be null")
    private Byte type;

    @NotBlank(message = "Name can't be blank")
    @Size(max = 255, message = "Name must be less than 255 characters")
    private String name;


    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @NotNull(message = "Preface can't be null")
    private Boolean preface;

    @Size(max = 65535, message = "Preface text is too long")
    private String prefaceText;

    @Positive(message = "Manager ID must be a positive number") //@Positive: Đảm bảo managerId là số dương (áp dụng cho khóa ngoại).
    private Long managerId;

    @Min(value = 0, message = "Read permission must be 0 or higher")
    @Max(value = 127, message = "Read permission must be 127 or lower")
    private Byte read;

    @Min(value = 0, message = "Write permission must be 0 or higher")
    @Max(value = 127, message = "Write permission must be 127 or lower")
    private Byte write;

    @NotNull(message = "Membership system can't be null")
    private Boolean membershipSystem;

    @NotNull(message = "Status cannot be null")
    @Min(value = 1, message = "Status must be at least 1")
    @Max(value = 127, message = "Status must be 127 or lower")
    private Byte status;
}