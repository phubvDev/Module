package com.avansoft.module_java_remake.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PostDTO {
    private Long id;

    @Positive(message = "Manager ID must be a positive number")
    private Long boardId;

    private String prefaceText;

    @NotBlank(message = "title can't be blank")
    @Size(max = 255, message = "title must be less than 255 characters")
    private String title;

    @NotBlank(message = "writerName can't be blank")
    @Size(max = 255, message = "writerName must be less than 255 characters")
    private String writerName;

    @NotNull(message = "date can't be null")
    private LocalDate date;

    @NotBlank(message = "detail can't be blank")
    private String detail;

    private String attachment1;
    private String attachment2;
    private String attachment3;
    private String youtubeURL;
    private String thumbnail;

    @NotNull(message = "totalView can't be null")
    private Integer totalView = 0;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String images;
}
