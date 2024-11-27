package com.avansoft.module_java_remake.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id",referencedColumnName = "id",foreignKey = @ForeignKey(name = "comments_post_id_foreign"))
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id",referencedColumnName = "id",foreignKey = @ForeignKey(name = "comments_parent_id_foreign"))
    @JsonBackReference
    private Comment parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "id",nullable = false,foreignKey = @ForeignKey(name = "comments_user_id_foreign") )
    private User user;

    @Column(name = "content",nullable = false,columnDefinition = "TEXT")
    private String content;

    @Column(name = "is_hidden",nullable = false,columnDefinition = "tinyint(1) default 0")
    private Boolean hidden;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> replies = new ArrayList<>();
}
