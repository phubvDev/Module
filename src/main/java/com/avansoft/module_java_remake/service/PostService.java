package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.PostDTO;
import com.avansoft.module_java_remake.entity.Board;
import com.avansoft.module_java_remake.entity.Post;
import com.avansoft.module_java_remake.repository.IBoardRepository;
import com.avansoft.module_java_remake.repository.IPostRepository;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService implements IPostService {


    private final IPostRepository postRepository;
    private final IBoardRepository boardRepository;
    private final IFileStorageService fileStorageService;

    @Autowired
    public PostService(IPostRepository postRepository, IBoardRepository boardRepository) {
        this.postRepository = postRepository;
        this.boardRepository = boardRepository;
        this.fileStorageService = new FileStorageService();
    }

    @Override
    public ResponseEntity<CoreResponse<?>> getAllPosts() {
        try {
            List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<PostDTO> postDTOS = posts.stream()
                    .map(post -> PostDTO.builder()
                            .id(post.getId())
                            .boardId(post.getBoard().getId())
                            .prefaceText(post.getPrefaceText())
                            .title(post.getTitle())
                            .writerName(post.getWriterName())
                            .date(post.getDate())
                            .detail(post.getDetail())
                            .attachment1(post.getAttachment1())
                            .attachment2(post.getAttachment2())
                            .attachment3(post.getAttachment3())
                            .youtubeURL(post.getYoutubeURL())
                            .thumbnail(post.getThumbnail())
                            .totalView(post.getTotalView())
                            .createdAt(post.getCreatedAt())
                            .updatedAt(post.getUpdatedAt())
                            .images(post.getImages())
                            .build())
                    .collect(Collectors.toList());
            String message = postDTOS.isEmpty() ? "Empty list post" : "Get list post successfully";
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message(message)
                            .data(postDTOS)
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
    public ResponseEntity<CoreResponse<?>> getPostByBoardId(Long boardId) {
        try {
            List<Post> posts = postRepository.findByBoardId(boardId, Sort.by(Sort.Direction.DESC, "id"));

            List<PostDTO> postDTOS = posts.stream()
                    .map(post -> PostDTO.builder()
                            .id(post.getId())
                            .boardId(post.getBoard().getId())
                            .prefaceText(post.getPrefaceText())
                            .title(post.getTitle())
                            .writerName(post.getWriterName())
                            .date(post.getDate())
                            .detail(post.getDetail())
                            .attachment1(post.getAttachment1())
                            .attachment2(post.getAttachment2())
                            .attachment3(post.getAttachment3())
                            .youtubeURL(post.getYoutubeURL())
                            .thumbnail(post.getThumbnail())
                            .totalView(post.getTotalView())
                            .createdAt(post.getCreatedAt())
                            .updatedAt(post.getUpdatedAt())
                            .images(post.getImages())
                            .build())
                    .collect(Collectors.toList());

            String message = postDTOS.isEmpty() ? "No posts found for this board" : "Posts found successfully";
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message(message)
                            .data(postDTOS)
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
    public ResponseEntity<CoreResponse<?>> addPost(PostDTO postDTO) {
        try {
            Board board = boardRepository.findById(postDTO.getBoardId())
                    .orElseThrow(() -> new Exception("Board not found"));
            Post post = new Post();
            post.setBoard(board);
            post.setPrefaceText(postDTO.getPrefaceText());
            post.setTitle(postDTO.getTitle());
            post.setWriterName(postDTO.getWriterName());
            post.setDate(postDTO.getDate());
            post.setDetail(postDTO.getDetail());

            // Xử lý file tải lên
            if (postDTO.getAttachment1File() != null && !postDTO.getAttachment1File().isEmpty()) {
                String path = fileStorageService.saveFile(postDTO.getAttachment1File(), "attachment");
                post.setAttachment1(path); // Lưu đường dẫn file
            }
            if (postDTO.getAttachment2File() != null && !postDTO.getAttachment2File().isEmpty()) {
                String path = fileStorageService.saveFile(postDTO.getAttachment2File(), "attachment");
                post.setAttachment2(path);
            }
            if (postDTO.getAttachment3File() != null && !postDTO.getAttachment3File().isEmpty()) {
                String path = fileStorageService.saveFile(postDTO.getAttachment3File(), "attachment");
                post.setAttachment3(path);
            }

            post.setYoutubeURL(postDTO.getYoutubeURL());

            if (postDTO.getThumbnailFile() != null && !postDTO.getThumbnailFile().isEmpty()) {
                String path = fileStorageService.saveFile(postDTO.getThumbnailFile(), "thumbnail");
                post.setThumbnail(path);
            }

            post.setTotalView(postDTO.getTotalView());
            post.setCreatedAt(postDTO.getCreatedAt());
            post.setUpdatedAt(postDTO.getUpdatedAt());
            post.setImages(postDTO.getImages());

            post = postRepository.save(post);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.CREATED.value())
                            .message("Post created successfully")
                            .data(post)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Failed to create post: " + e.getMessage())
                            .data(null)
                            .build());
        }
    }

    @Override
    public ResponseEntity<CoreResponse<?>> updatePost(Long id, PostDTO postDTO) {
        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new Exception("Post not found"));
            if (postDTO.getBoardId() != null) {
                Board board = boardRepository.findById(postDTO.getBoardId())
                        .orElseThrow(() -> new RuntimeException("Board not found"));
                post.setBoard(board);
            }
            post.setTitle(postDTO.getTitle());
            post.setWriterName(postDTO.getWriterName());
            post.setDate(postDTO.getDate());
            post.setDetail(postDTO.getDetail());
            post.setAttachment1(postDTO.getAttachment1());
            post.setAttachment2(postDTO.getAttachment2());
            post.setAttachment3(postDTO.getAttachment3());
            post.setYoutubeURL(postDTO.getYoutubeURL());
            post.setThumbnail(postDTO.getThumbnail());
            post.setImages(postDTO.getImages());

            post = postRepository.save(post);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("Post updated successfully")
                            .data(post)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Failed to update board: " + e.getMessage())
                            .data(null)
                            .build());

        }
    }

    @Transactional
    @Override
    public ResponseEntity<CoreResponse<?>> deletePost(Long id) {
        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new Exception("Post not found"));
            postRepository.delete(post);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CoreResponse.builder()
                            .code(HttpStatus.OK.value())
                            .message("Post deleted successfully")
                            .data(null)
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
}
