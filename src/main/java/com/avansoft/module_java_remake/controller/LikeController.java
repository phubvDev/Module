package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.LikeDTO;
import com.avansoft.module_java_remake.response.CoreResponse;
import com.avansoft.module_java_remake.service.ILikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${API_BASE_URL}/likes")
public class LikeController {
    private final ILikeService likeService;

    @Autowired
    public LikeController (ILikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/countLikeByPostId/{postId}")
    public ResponseEntity<CoreResponse<?>> countLike(@PathVariable("postId") Long postId) {
        return likeService.countLikeByPostId(postId);
    }

    @GetMapping("/getLikeByUserIdAndPostId")
    public ResponseEntity<CoreResponse<?>> getLikeByUserIdAndPostId(@RequestParam("userId") Long userId, @RequestParam("postId") Long postId) {
        return likeService.getLikeByUserIdAndPostId(userId, postId);
    }


    @PostMapping("/toggleLike")
    public ResponseEntity<CoreResponse<?>> toggleLike(@RequestBody LikeDTO likeDTO){
        return likeService.toggleLike(likeDTO);
    }


}
