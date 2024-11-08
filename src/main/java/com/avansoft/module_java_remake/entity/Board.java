package com.avansoft.module_java_remake.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "boards")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "board_id",nullable = false,length = 255)
    private String boardId;

    @Column(nullable = false)
    private Byte type;

    @Column(nullable = false,length = 255)
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(nullable = false,columnDefinition = "tinyint(1) default 0")
    private Boolean preface;

    @Column(name = "preface_text",columnDefinition = "TEXT")
    private String prefaceText;

//    @ManyToOne
//    @JoinColumn(name = "manager_id",referencedColumnName = "id",foreignKey = @ForeignKey(name = "boards_manager_id_foreign"))
//    private User manager;

    @Column(name = "read")
    private Byte read;

    @Column(name = "write")
    private Byte write;

    @Column(name = "membership_system", nullable = false, columnDefinition = "tinyint(1) default 0")
    private Boolean membershipSystem;

    @Column(nullable = false, columnDefinition = "tinyint default 1")
    private Byte status;

    @Override
    public String toString() {
        return "Board{" +
                "id=" + id +
                ", boardId='" + boardId + '\'' +
                ", type=" + type +
                ", name='" + name + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", preface=" + preface +
                ", prefaceText='" + prefaceText + '\'' +
//                ", managerId=" + manager +
                ", read=" + read +
                ", write=" + write +
                ", membershipSystem=" + membershipSystem +
                ", status=" + status +
                '}';
    }
}
