package com.avansoft.module_java_remake.service;


import com.avansoft.module_java_remake.response.CoreResponse;

public interface IBoardService {
    CoreResponse<?> getAllBoards();
    CoreResponse<?> getBoardById(Long id);
}
