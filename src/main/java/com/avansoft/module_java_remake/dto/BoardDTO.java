package com.avansoft.module_java_remake.dto;

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
    private String boardId;
    private Byte type;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean preface;
    private String prefaceText;
    private Long managerId;
    private Byte read;
    private Byte write;
    private Boolean membershipSystem;
    private Byte status;


}