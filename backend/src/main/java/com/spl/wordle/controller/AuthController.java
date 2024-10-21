package com.spl.wordle.controller;

import com.spl.wordle.security.oauth.OAuthService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import com.spl.wordle.dto.AuthRequestDTO;
import com.spl.wordle.dto.AuthResponseDTO;
import com.spl.wordle.security.SecurityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final SecurityService securityService;
    private final OAuthService oAuthService;

    @Operation(
            summary = "Вход пользователя",
            description = "Авторизация пользователя с использованием учетных данных.")
    @PostMapping("/login")
    public Mono<AuthResponseDTO> login(@RequestBody AuthRequestDTO dto, ServerHttpResponse response) {
        return securityService.login(dto, response);
    }
    @Operation(
            summary = "Обновление токена",
            description = "Обновить токен доступа с использованием refresh-токена.")
    @PostMapping("/refresh")
    public Mono<AuthResponseDTO> refresh(
            @CookieValue("refresh_token") String refreshToken,
            ServerHttpResponse response) {
        return securityService.refresh(refreshToken, response);
    }

    @Operation(
            summary = "OAuth2 авторизация через VK",
            description = "Обработка OAuth2 авторизации через ВКонтакте.")
    @GetMapping("/oauth2/vk")
    public Mono<Void> oauth2(@RegisteredOAuth2AuthorizedClient("vk") OAuth2AuthorizedClient authorizedClient) {
        return null;
    }


    @Hidden
    @GetMapping("/login/oauth2/code/vk")
    public Mono<AuthResponseDTO> handleRedirect(@RequestParam("code") String code,  ServerHttpResponse response) {
        return oAuthService.authenticate(code, response);
    }
}
