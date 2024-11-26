package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.CommentDTO;
import com.avansoft.module_java_remake.entity.Comment;
import com.avansoft.module_java_remake.entity.Post;
import com.avansoft.module_java_remake.entity.User;
import com.avansoft.module_java_remake.repository.ICommentRepository;
import com.avansoft.module_java_remake.repository.IPostRepository;
import com.avansoft.module_java_remake.repository.IUserRepository;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService implements ICommentService {

    private final IPostRepository postRepository;
    private final IUserRepository userRepository;
    private final ICommentRepository commentRepository;

    @Autowired
    public CommentService(IPostRepository postRepository, IUserRepository userRepository, ICommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public ResponseEntity<CoreResponse<?>> findAllCommentsByPostId(Long postId) {
        try {
            List<Comment> comments = commentRepository.findAllCommentsByPostId(postId, Sort.by(Sort.Direction.DESC, "id"));
            List<CommentDTO> commentDTOS = comments.stream()
                    .map(comment -> {
                        CommentDTO.CommentDTOBuilder commentDTOBuilder = CommentDTO.builder()
                                .id(comment.getId())
                                .postId(comment.getPost().getId())
                                .userId(comment.getUser().getId())
                                .content(comment.getContent())
                                .hidden(comment.getHidden())
                                .createdAt(comment.getCreatedAt())
                                .updatedAt(comment.getUpdatedAt())
                                .deletedAt(comment.getDeletedAt());

                        if (comment.getParent() != null) {
                            commentDTOBuilder.parentId(comment.getParent().getId());
                        } else {
                            commentDTOBuilder.parentId(null);
                        }

                        return commentDTOBuilder.build();
                    })
                    .collect(Collectors.toList());

            String message = commentDTOS.isEmpty() ? "empty comments" : "get list post successfully";
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message(message)
                            .data(commentDTOS)
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
    public ResponseEntity<CoreResponse<?>> findById(Long id) {
        try {
            Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("comment not found"));
            CommentDTO commentDTO = CommentDTO.builder()
                    .id(comment.getId())
                    .postId(comment.getPost().getId())
                    .userId(comment.getUser().getId())
                    .hidden(comment.getHidden())
                    .content(comment.getContent())
                    .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                    .createdAt(comment.getCreatedAt())
                    .updatedAt(comment.getUpdatedAt())
                    .deletedAt(comment.getDeletedAt())
                    .build();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("comment found successfully")
                            .data(commentDTO)
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
    public ResponseEntity<CoreResponse<?>> addComment(CommentDTO commentDTO) {
        try {
            Post post = postRepository.findById(commentDTO.getPostId())
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            User user = userRepository.findById(commentDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Comment newComment = new Comment();
            newComment.setPost(post);
            newComment.setUser(user);
            newComment.setContent(commentDTO.getContent());

            if (commentDTO.getParentId() != null) {
                //lấy bình luận cha nếu có
                Comment parentComment = commentRepository.findById(commentDTO.getParentId())
                        .orElseThrow(() -> new RuntimeException("Parent comment not found"));
                newComment.setParent(parentComment); //gán bình luận cha
            }
            newComment.setHidden(false);
            newComment.setCreatedAt(LocalDateTime.now());
            newComment.setUpdatedAt(LocalDateTime.now());
            newComment.setDeletedAt(commentDTO.getDeletedAt());

            Comment savedComment = commentRepository.save(newComment);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.CREATED.value())
                            .message("created comment successfully")
                            .data(savedComment)
                            .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Failed to create comment: " + e.getMessage())
                            .data(null)
                            .build());
        }
    }

    @Transactional
    @Override
    public ResponseEntity<CoreResponse<?>> updateComment(Long id, CommentDTO commentDTO) {
        try {
            Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Comment not found"));

//            if (commentDTO.getPostId() != null) {
//                Post post = postRepository.findById(commentDTO.getPostId())
//                        .orElseThrow(() -> new RuntimeException("Post not found"));
//                comment.setPost(post);
//            }
//
//            if (commentDTO.getUserId() != null) {
//                User user = userRepository.findById(commentDTO.getUserId())
//                        .orElseThrow(() -> new RuntimeException("User not found"));
//                comment.setUser(user);
//            }

            if (commentDTO.getContent() != null) {
                comment.setContent(commentDTO.getContent());
            }
//            if (commentDTO.getParentId() != null) {
//                Comment commentParent = commentRepository.findById(commentDTO.getParentId())
//                        .orElseThrow(() -> new RuntimeException("Parent comment not found"));
//                comment.setParent(commentParent);
//            }

            if (commentDTO.getHidden() != null) {
                comment.setHidden(commentDTO.getHidden());
            }
            comment.setDeletedAt(commentDTO.getDeletedAt());
            comment.setUpdatedAt(LocalDateTime.now());

            Comment savedComment = commentRepository.save(comment);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("Updated comment successfully")
                            .data(savedComment)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Failed to update comment: " + e.getMessage())
                            .data(null)
                            .build());
        }
    }

    @Override
    @Transactional
    public ResponseEntity<CoreResponse<?>> deletesoftComment(Long id) {
        try {
            Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Comment not found"));

            comment.setDeletedAt(LocalDateTime.now());

            Comment savedComment = commentRepository.save(comment);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("deleted soft comment successfully")
                            .data(savedComment)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Failed to update comment: " + e.getMessage())
                            .data(null)
                            .build());
        }
    }
}
