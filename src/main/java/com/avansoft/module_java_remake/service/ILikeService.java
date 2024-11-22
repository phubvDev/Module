package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.LikeDTO;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.http.ResponseEntity;

public interface ILikeService {
    ResponseEntity<CoreResponse<?>> getAllLikes();
    ResponseEntity<CoreResponse<?>> getLikeByUserId(Long userId);
    ResponseEntity<CoreResponse<?>> getLikeByPostId(Long postId);
    ResponseEntity<CoreResponse<?>> getLikeByUserIdAndPostId(Long userId, Long postId);
    ResponseEntity<CoreResponse<?>> countLikeByPostId(Long postId);
    ResponseEntity<CoreResponse<?>> toggleLike(LikeDTO likeDTO);

}
