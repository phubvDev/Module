package com.avansoft.module_java_remake.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="board_id",nullable = false, referencedColumnName = "id",foreignKey = @ForeignKey(name = "posts_board_id_foreign"))
    private Board board;

    @Column(name = "preface_text",columnDefinition = "TEXT")
    private String prefaceText;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "writer_name",nullable = false)
    private String writerName;

    @Column(name = "date",nullable = false)
    private LocalDate date;

    @Column(name="detail",nullable = false,columnDefinition = "LONGTEXT")
    private String detail;

    @Column(name = "attachment_1",columnDefinition = "LONGTEXT")
    private String attachment1;

    @Column(name = "attachment_2",columnDefinition = "LONGTEXT")
    private String attachment2;

    @Column(name = "attachment_3",columnDefinition = "LONGTEXT")
    private String attachment3;

    @Column(name = "youtube_url")
    private String youtubeURL;

    @Column(name = "thumbnail",columnDefinition = "LONGTEXT")
    private String thumbnail;

    @Column(name = "total_view",nullable = false)
    private Integer totalView = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "images",columnDefinition = "TEXT")
    private String images;

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", board=" + (board != null ? board.getId() : null) +
                ", prefaceText='" + prefaceText + '\'' +
                ", title='" + title + '\'' +
                ", writerName='" + writerName + '\'' +
                ", date=" + date +
                ", detail='" + detail + '\'' +
                ", attachment1='" + attachment1 + '\'' +
                ", attachment2='" + attachment2 + '\'' +
                ", attachment3='" + attachment3 + '\'' +
                ", youtubeURL='" + youtubeURL + '\'' +
                ", totalView=" + totalView +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", images='" + images + '\'' +
                '}';
    }
}
