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
@CrossOrigin(origins = "http://13.124.14.236/")
public class PostController {
    private final IPostService postService;

    @Autowired
    public PostController(IPostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<CoreResponse<?>> getPostByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.getPostByPage(page,size);
    }

    @GetMapping("/allposts")
    public ResponseEntity<CoreResponse<?>> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/byBoardId/{boardId}")
    public ResponseEntity<CoreResponse<?>> getPostByBoardId(@PathVariable Long boardId,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size ) {
        return postService.getPostByBoardId(boardId,page,size);
    }

    @GetMapping("/board/{boardId}/preface")
    public ResponseEntity<CoreResponse<?>> getPostsByBoardIdAndPrefaceText(
            @PathVariable Long boardId,
            @RequestParam String prefaceText,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return postService.getPostByBoardIdAndPrefaceText(boardId, prefaceText, page, size);
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

    @PatchMapping("/updatetotalview/{id}")
    public ResponseEntity<CoreResponse<?>> updateTotalView(@PathVariable Long id) {
        return postService.updateTotalViews(id);
    }
    @DeleteMapping("/deletepost/{id}")
    public ResponseEntity<CoreResponse<?>> deletePost(@PathVariable("id") Long id) {
        return postService.deletePost(id);
    }
}
