package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILikeRepository extends JpaRepository<Like,Long> {
    Like findByUserIdAndPostId(Long userId, Long postId);
    List<Like> findAllByPostId(Long postId);
    Long countByPostIdAndLiked(Long postId, Boolean liked);
}

