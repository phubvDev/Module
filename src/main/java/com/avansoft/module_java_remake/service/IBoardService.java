package com.avansoft.module_java_remake.service;


import com.avansoft.module_java_remake.dto.BoardDTO;
import com.avansoft.module_java_remake.entity.Board;
import com.avansoft.module_java_remake.response.CoreResponse;

public interface IBoardService {
    CoreResponse<?> getAllBoards();
    CoreResponse<?> getBoardById(Long id);
    CoreResponse<?> addBoard (BoardDTO boardDTO);
    CoreResponse<?> updateBoard(Long id,BoardDTO boardDTO);
    CoreResponse<?> deleteBoardById(Long id);
}
