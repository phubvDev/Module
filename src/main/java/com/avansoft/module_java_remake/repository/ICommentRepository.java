package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.Comment;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {

    //Lấy toàn bộ comment gốc (parent_id = null) và các comment con đệ quy của một bài viết
    List<Comment> findAllCommentsByPostId(Long postId, Sort sort);
}
