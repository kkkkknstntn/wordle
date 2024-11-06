package com.spl.apigateway.service;

import com.spl.apigateway.entity.User;
import com.spl.apigateway.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Mono<User> getById(Long id) {
        return userRepository.findById(id);
    }


}