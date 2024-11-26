package com.avansoft.module_java_remake.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonBackReference
    private List<Comment> comments = new ArrayList<>();

}
