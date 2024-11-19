package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.PostDTO;
import com.avansoft.module_java_remake.entity.Post;
import com.avansoft.module_java_remake.response.CoreResponse;
import com.avansoft.module_java_remake.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${API_BASE_URL}/posts")
@CrossOrigin(origins = "http://localhost:5173/")
public class PostController {
    private final IPostService postService;

    @Autowired
    public PostController(IPostService postService) {
        this.postService = postService;
    }
    @GetMapping()
    public ResponseEntity<CoreResponse<?>> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/byBoardId/{boardId}")
    public ResponseEntity<CoreResponse<?>> getPostByBoardId(@PathVariable Long boardId) {
        return postService.getPostByBoardId(boardId);
    }

    @PostMapping("/addpost")
    public ResponseEntity<CoreResponse<?>> addPost(
            @Valid @ModelAttribute PostDTO postDTO,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            System.out.println("bindingResult: " + bindingResult.getAllErrors());
            bindingResult.getAllErrors().forEach(error -> System.out.println("--> error: " + error.getDefaultMessage()));
            String errorMessage = bindingResult.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(","));

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message("Validation error: " + errorMessage)
                            .data(null)
                            .build());
        } else {
            System.out.println("Khong co error");
        }
        return postService.addPost(postDTO);
    }

    @PutMapping("/editpost/{id}")
    public ResponseEntity<CoreResponse<?>> editPost(@PathVariable Long id, @Valid @ModelAttribute PostDTO postDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(","));

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message("Validation error: " + errorMessage)
                            .data(null)
                            .build());
        }
        return postService.updatePost(id, postDTO);
    }

    @DeleteMapping("/deletepost/{id}")
    public ResponseEntity<CoreResponse<?>> deletePost(@PathVariable("id") Long id) {
        return postService.deletePost(id);
    }
}
