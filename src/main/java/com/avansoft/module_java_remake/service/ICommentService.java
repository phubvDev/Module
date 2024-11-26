package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.CommentDTO;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.http.ResponseEntity;

public interface ICommentService {
    ResponseEntity<CoreResponse<?>> findAllCommentsByPostId(Long postId);

    ResponseEntity<CoreResponse<?>> findById(Long id);
    ResponseEntity<CoreResponse<?>> addComment(CommentDTO commentDTO);
    ResponseEntity<CoreResponse<?>> updateComment(Long id, CommentDTO commentDTO);
    ResponseEntity<CoreResponse<?>> deletesoftComment(Long id);
}
