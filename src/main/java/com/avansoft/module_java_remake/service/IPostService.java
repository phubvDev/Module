package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.PostDTO;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.http.ResponseEntity;

public interface IPostService {
    ResponseEntity<CoreResponse<?>> getAllPosts();
    ResponseEntity<CoreResponse<?>> getPostByPage(int pageNo, int pageSize);
    ResponseEntity<CoreResponse<?>> getPostByBoardId(Long boardId, int page, int size);
    ResponseEntity<CoreResponse<?>> getPostByBoardIdAndPrefaceText(Long boardId, String prefaceText, int page, int size);
    ResponseEntity<CoreResponse<?>> addPost(PostDTO postDTO);
    ResponseEntity<CoreResponse<?>> updatePost(Long id,PostDTO postDTO);
    ResponseEntity<CoreResponse<?>> updateTotalViews(Long id);
    ResponseEntity<CoreResponse<?>> deletePost(Long id);
}
