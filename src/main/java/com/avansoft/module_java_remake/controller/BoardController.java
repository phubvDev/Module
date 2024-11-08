package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.response.CoreResponse;
import com.avansoft.module_java_remake.service.IBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/avansoft/module/boards")
public class BoardController {
    private final IBoardService boardService;

    @Autowired
    public BoardController(IBoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public CoreResponse<?> getBoards() {
        return boardService.getAllBoards();
    }

    @GetMapping("/{id}")
    public CoreResponse<?> getBoardById(@PathVariable("id") Long id) {
        return boardService.getBoardById(id);
    }

}
