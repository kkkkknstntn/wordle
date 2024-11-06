package com.spl.authservice.service;

import com.spl.authservice.dto.UserRequestDTO;
import com.spl.authservice.dto.UserResponseDTO;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface UserService {
    Mono<UserResponseDTO> getByUsername(String username);
    Mono<UserResponseDTO> create(UserRequestDTO userDTO);
    Mono<UserResponseDTO> createVk(UserRequestDTO userDTO, Long vkId);

}
