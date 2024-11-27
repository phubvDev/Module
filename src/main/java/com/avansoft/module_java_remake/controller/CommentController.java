package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.CommentDTO;
import com.avansoft.module_java_remake.response.CoreResponse;
import com.avansoft.module_java_remake.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${API_BASE_URL}/comments")
@CrossOrigin(origins = "http://13.124.14.236/")
public class CommentController {
    private final ICommentService commentService;

    @Autowired
    public CommentController(ICommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/byPostIdOrParentId")
    public ResponseEntity<CoreResponse<?>> findAllCommentsByPostId(@RequestParam Long postId) {
        return commentService.findAllCommentsByPostId(postId);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<CoreResponse<?>> getCommentById(@PathVariable Long id) {
        return commentService.findById(id);
    }

    @PostMapping("/addcomment")
    public ResponseEntity<CoreResponse<?>> addComment(@RequestBody CommentDTO commentDTO) {
        return commentService.addComment(commentDTO);
    }

    @PatchMapping("/updatecomment/{id}")
    public ResponseEntity<CoreResponse<?>> updateComment(@PathVariable Long id, @RequestBody CommentDTO commentDTO) {
        return commentService.updateComment(id,commentDTO);
    }

    @PatchMapping("/deletesoftcomment/{id}")
    public ResponseEntity<CoreResponse<?>> deleteSoftComment(@PathVariable Long id) {
        return commentService.deletesoftComment(id);
    }
}

