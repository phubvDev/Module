package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.PostDTO;
import com.avansoft.module_java_remake.response.CoreResponse;

public interface IPostService {
    CoreResponse<?> getAllPosts();
    CoreResponse<?> getPostByBoardId(Long boardId);
    CoreResponse<?> addPost(PostDTO postDTO);
    CoreResponse<?> updatePost(Long id,PostDTO postDTO);
    CoreResponse<?> deletePost(Long id);
}
