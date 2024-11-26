package com.avansoft.module_java_remake.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentDTO {
    private Long id;
    private Long postId;
    private Long parentId;
    private Long userId;
    private String content;
    private Boolean hidden;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
    private List<CommentDTO> replies = new ArrayList<>();
}
