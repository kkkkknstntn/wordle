package com.spl.gameservice.service;

import com.spl.gameservice.dto.UserResponseDTO;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface UserService {
    Mono<UserResponseDTO> getById(Long id);
    Mono<UserResponseDTO> findByUsername(String username);
    Flux<UserResponseDTO> getList();
//    Mono<UserResponseDTO> update(Long id, UserRequestDTO userDTO);
    Mono<Void> delete(Long id);
    Flux<UserResponseDTO> getUsersSortedByWins(int page, int size);
    Mono<UserResponseDTO> findUserPositionByWinLossRatio(String username);
    Mono<UserResponseDTO> findUserPositionByWins(String username);
    Flux<UserResponseDTO> getUsersSortedByWinLossRatio(int page, int size);
}
