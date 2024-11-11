package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.BoardDTO;
import com.avansoft.module_java_remake.entity.Board;
import com.avansoft.module_java_remake.response.CoreResponse;
import com.avansoft.module_java_remake.service.IBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/addboard")
    public CoreResponse<?> addBoard(@RequestBody BoardDTO boardDTO) {
        return boardService.addBoard(boardDTO);
    }

    @GetMapping("/{id}")
    public CoreResponse<?> getBoardById(@PathVariable("id") Long id) {
        return boardService.getBoardById(id);
    }

}
