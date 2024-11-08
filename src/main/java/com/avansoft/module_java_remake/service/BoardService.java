package com.avansoft.module_java_remake.service;

import com.avansoft.module_java_remake.dto.BoardDTO;
import com.avansoft.module_java_remake.entity.Board;
import com.avansoft.module_java_remake.repository.IBoardRepository;
import com.avansoft.module_java_remake.response.CoreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService implements IBoardService{
    private final IBoardRepository boardRepository;

    @Autowired
    public BoardService(IBoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }
    @Override
    public CoreResponse<?> getAllBoards() {
        try {
            List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

            List<BoardDTO> boardDTOS = boards.stream()
                    .map(board -> BoardDTO.builder()
                            .id(board.getId())
                            .boardId(board.getBoardId())
                            .type(board.getType())
                            .name(board.getName())
                            .createdAt(board.getCreatedAt())
                            .updatedAt(board.getUpdatedAt())
                            .preface(board.getPreface())
                            .prefaceText(board.getPrefaceText())
//                            .managerId(board.getManager().getId())
                            .read(board.getRead())
                            .write(board.getWrite())
                            .membershipSystem(board.getMembershipSystem())
                            .status(board.getStatus())
                            .build())
                    .collect(Collectors.toList());
            String message = boardDTOS.isEmpty() ? "Empty list board" : "Get list board successfully";
            System.out.println("Core response: " + CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(boardDTOS)
                    .build());
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(boardDTOS)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getBoardById(Long id) {
        try {
            Board board = boardRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Board not found"));
            BoardDTO boardDTO = BoardDTO.builder()
                    .id(board.getId())
                    .boardId(board.getBoardId())
                    .type(board.getType())
                    .name(board.getName())
                    .createdAt(board.getCreatedAt())
                    .updatedAt(board.getUpdatedAt())
                    .preface(board.getPreface())
                    .prefaceText(board.getPrefaceText())
                    .read(board.getRead())
                    .write(board.getWrite())
                    .membershipSystem(board.getMembershipSystem())
                    .status(board.getStatus())
                    .build();

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Board found successfully")
                    .data(boardDTO)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
    }
}
