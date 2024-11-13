package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBoardRepository extends JpaRepository<Board,Long> {
    boolean existsByBoardId(String boardId);
}
