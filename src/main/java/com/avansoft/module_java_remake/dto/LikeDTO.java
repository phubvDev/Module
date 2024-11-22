package com.avansoft.module_java_remake.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LikeDTO {
    private Long id;
    private Long userId;
    private Long postId;
    private Boolean liked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
