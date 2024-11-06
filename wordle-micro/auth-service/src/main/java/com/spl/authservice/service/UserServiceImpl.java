package com.spl.authservice.service;

import com.spl.authservice.dto.UserRequestDTO;
import com.spl.authservice.dto.UserResponseDTO;
import com.spl.authservice.entity.User;
import com.spl.authservice.enums.Provider;
import com.spl.authservice.enums.UserRole;
import com.spl.authservice.exception.ApiException;
import com.spl.authservice.mapper.UserMapper;
import com.spl.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    @Override
    public Mono<UserResponseDTO> create(UserRequestDTO userDTO) {
        return saveUser(userDTO, Provider.PASSWORD, null);
    }

    @Override
    public Mono<UserResponseDTO> createVk(UserRequestDTO userDTO, Long vkId) {
        return saveUser(userDTO, Provider.VK, vkId);
    }

    private Mono<UserResponseDTO> saveUser(UserRequestDTO userDTO, Provider provider, Long vkId) {
        User user = build(userDTO);
        User newUser = user.toBuilder()
                .provider(provider)
                .password(provider == Provider.PASSWORD ? passwordEncoder.encode(user.getPassword()) : null)
                .vkId(vkId)
                .build();

        return userRepository.save(newUser)
                .doOnSuccess(u -> log.info("IN create - user: {} created", u))
                .map(userMapper::responseMap)
                .doOnError(throwable -> log.error("Error creating user: {}", throwable.getMessage()))
                .onErrorMap(e -> new ApiException("Username already exists", "INVALID_USERNAME"));
    }

    private User build(UserRequestDTO userDTO) {
        return userMapper.requestMap(userDTO).toBuilder()
                .role(UserRole.USER)
                .enabled(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    @Override
    public Mono<UserResponseDTO> getByUsername(String username) {
        return userRepository.findByUsername(username).map(userMapper::responseMap);
    }
}