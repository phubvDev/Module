package com.avansoft.module_java_remake.controller;

import com.avansoft.module_java_remake.dto.PostDTO;
import com.avansoft.module_java_remake.entity.Post;
import com.avansoft.module_java_remake.response.CoreResponse;
import com.avansoft.module_java_remake.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
    public CoreResponse<?> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/byBoardId/{boardId}")
    public CoreResponse<?> getPostByBoardId(@PathVariable Long boardId) {
        return postService.getPostByBoardId(boardId);
    }

    @PostMapping("/addpost")
    public CoreResponse<?> addPost(@Valid @RequestBody PostDTO postDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> System.out.println("--> error: " + error.getDefaultMessage()));
            String errorMessage = bindingResult.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(","));

            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Validation error: " + errorMessage)
                    .data(null)
                    .build();
        } else {
            System.out.println("Khong co error");
        }
        return postService.addPost(postDTO);
    }
}
