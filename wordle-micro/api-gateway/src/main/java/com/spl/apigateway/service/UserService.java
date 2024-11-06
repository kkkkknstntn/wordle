package com.spl.apigateway.service;

import com.spl.apigateway.entity.User;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface UserService {
    Mono<User> getById(Long id);
}
