package com.avansoft.module_java_remake.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false,referencedColumnName = "id",foreignKey = @ForeignKey(name = "likes_post_id_foreign"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id",nullable = false,referencedColumnName = "id",foreignKey = @ForeignKey(name = "likes_user_id_foreign"))
    private Post post;

    @Column(name = "is_like",nullable = false,columnDefinition = "tinyint(1) default 0")
    private Boolean liked;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
