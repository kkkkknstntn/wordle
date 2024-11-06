package com.spl.gameservice.service;

import com.spl.gameservice.dto.UserResponseDTO;
import com.spl.gameservice.mapper.UserMapper;
import com.spl.gameservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public Flux<UserResponseDTO> getList() {
        return userRepository.findAll()
                .map(userMapper::responseMap);
    }

    @Override
    public Flux<UserResponseDTO> getUsersSortedByWins(int page, int size) {
        return userRepository.findAllSortedByWins(size, (page - 1) * size)
                .map(userMapper::responseMap);
    }

    @Override
    public Flux<UserResponseDTO> getUsersSortedByWinLossRatio(int page, int size) {
        return userRepository.findAllSortedByWinLossRatio(size, (page - 1) * size)
                .map(userMapper::responseMap);
    }

    @Override
    public Mono<UserResponseDTO> findUserPositionByWins(String username) {
        log.info("{}",username);
        return findByUsername(username).flatMap(userResponseDTO ->
                userRepository.findUserRankByWins(username).flatMap(integer -> {
                    log.info("{} {}",username, integer);
                    userResponseDTO.setPosition(integer);
                    return Mono.just(userResponseDTO);
                }));
    }

    @Override
    public Mono<UserResponseDTO> findUserPositionByWinLossRatio(String username) {
        return findByUsername(username).flatMap(userResponseDTO ->
                userRepository.findUserRankByWinLossRatio(username).flatMap(integer -> {
                    userResponseDTO.setPosition(integer);
                    return Mono.just(userResponseDTO);
                }));

    }

    @Override
    public Mono<UserResponseDTO> getById(Long id) {
        if (id == null) return Mono.empty();
        return findById(id);
    }

    private Mono<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id).map(userMapper::responseMap);
    }

    @Override
    public Mono<UserResponseDTO> findByUsername(String username) {
        return userRepository.findByUsername(username).map(userMapper::responseMap);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return userRepository.deleteById(id);
    }

}