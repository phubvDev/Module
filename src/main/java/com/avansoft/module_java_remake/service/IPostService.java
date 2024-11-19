package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.PostDTO;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface IPostService {
    ResponseEntity<CoreResponse<?>> getAllPosts();
    ResponseEntity<CoreResponse<?>> getPostByBoardId(Long boardId);
    ResponseEntity<CoreResponse<?>> addPost(PostDTO postDTO);
    ResponseEntity<CoreResponse<?>> updatePost(Long id,PostDTO postDTO);
    ResponseEntity<CoreResponse<?>> deletePost(Long id);
}
