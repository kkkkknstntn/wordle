package com.spl.apigateway.security;

import com.spl.apigateway.entity.User;
import com.spl.apigateway.exception.UnauthorizedException;
import com.spl.apigateway.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthenticationManager implements ReactiveAuthenticationManager {

    private final UserService userService;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        return userService.getById(principal.getId())
                .filter(User::isEnabled)
                .switchIfEmpty(Mono.error(new UnauthorizedException("User disabled")))
                .map(user -> authentication);
    }
}
