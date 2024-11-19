package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post,Long> {
    List<Post> findByBoardId(Long boardId, Sort sort);

}
