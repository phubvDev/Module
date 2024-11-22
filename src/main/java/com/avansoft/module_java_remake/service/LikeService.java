package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.LikeDTO;
import com.avansoft.module_java_remake.entity.Like;
import com.avansoft.module_java_remake.entity.Post;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.repository.ILikeRepository;
import com.avansoft.module_java_remake.repository.IPostRepository;
import com.avansoft.module_java_remake.repository.IUserRepository;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeService implements ILikeService {
    private final ILikeRepository likeRepository;
    private final IPostRepository postRepository;
    private final IUserRepository userRepository;

    @Autowired
    public LikeService(ILikeRepository likeRepository, IPostRepository postRepository, IUserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<CoreResponse<?>> getAllLikes() {
        return null;
    }

    @Override
    public ResponseEntity<CoreResponse<?>> getLikeByUserId(Long userId) {
        return null;
    }

    @Override
    public ResponseEntity<CoreResponse<?>> getLikeByPostId(Long postId) {
        try {
            List<Like> likes = likeRepository.findAllByPostId(postId);
            List<LikeDTO> likeDTOS = likes.stream()
                    .map(like -> LikeDTO.builder()
                            .id(like.getId())
                            .postId(like.getPost().getId())
                            .userId(like.getUser().getId())
                            .liked(like.getLiked())
                            .createdAt(like.getCreatedAt())
                            .updatedAt(like.getUpdatedAt())
                            .build())
                    .collect(Collectors.toList());
            String message = likeDTOS.isEmpty() ? "Empty list like" : "get list like successfully";
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message(message)
                            .data(likeDTOS)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .data(null)
                            .build());
        }
    }

    @Override
    public ResponseEntity<CoreResponse<?>> getLikeByUserIdAndPostId(Long userId, Long postId) {
        try {
            Like like = likeRepository.findByUserIdAndPostId(userId, postId);
            if (like != null) {
                LikeDTO likeDTO = LikeDTO.builder()
                        .id(like.getId())
                        .postId(like.getPost().getId())
                        .userId(like.getUser().getId())
                        .liked(like.getLiked())
                        .createdAt(like.getCreatedAt())
                        .updatedAt(like.getUpdatedAt())
                        .build();
                return ResponseEntity.status(HttpStatus.OK)
                        .body(CoreResponse.builder()
                                .code(HttpStatus.OK.value())
                                .message("get like successfully")
                                .data(likeDTO)
                                .build());
            } else {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(CoreResponse.builder()
                                .code(HttpStatus.OK.value())
                                .message("not found like")
                                .data(null)
                                .build());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .data(null)
                            .build());
        }
    }

    @Override
    public ResponseEntity<CoreResponse<?>> countLikeByPostId(Long postId) {
        try {
            long totalLikes = likeRepository.countByPostIdAndLiked(postId, true);
            long totalDislikes = likeRepository.countByPostIdAndLiked(postId, false);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("count successfully")
                            .data(new long[]{totalLikes, totalDislikes})
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .data(null)
                            .build());
        }
    }

    @Transactional
    @Override
    public ResponseEntity<CoreResponse<?>> toggleLike(LikeDTO likeDTO) {
        Like like = likeRepository.findByUserIdAndPostId(likeDTO.getUserId(), likeDTO.getPostId());
        if (like != null) {
            like.setLiked(likeDTO.getLiked());
            like.setUpdatedAt(LocalDateTime.now());
            likeRepository.save(like);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("Like state updated successfully")
                            .data(like)
                            .build());
        } else {
            try {
                User user = userRepository.findById(likeDTO.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found."));
                Post post = postRepository.findById(likeDTO.getPostId())
                        .orElseThrow(() -> new RuntimeException("Post not found."));
                Like newLike = new Like();
                newLike.setUser(user);
                newLike.setPost(post);
                newLike.setLiked(likeDTO.getLiked());
                newLike.setCreatedAt(LocalDateTime.now());
                newLike.setUpdatedAt(LocalDateTime.now());

                newLike = likeRepository.save(newLike);

                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(CoreResponse.builder()
                                .code(HttpStatus.CREATED.value())
                                .message("Like added successfully.")
                                .data(newLike)
                                .build());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(CoreResponse.builder()
                                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .message("Failed to create like: " + e.getMessage())
                                .data(null)
                                .build());
            }

        }
    }

}
