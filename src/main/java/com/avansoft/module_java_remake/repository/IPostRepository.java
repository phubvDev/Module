package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByBoardId(Long boardId, Pageable pageable);
    @Query("SELECT p FROM Post p WHERE p.board.id = :boardId AND (:prefaceText IS NULL OR p.prefaceText = :prefaceText)")
    Page<Post> findByBoardIdAndPrefaceText(@Param("boardId") Long boardId, @Param("prefaceText") String prefaceText, Pageable pageable);

}
