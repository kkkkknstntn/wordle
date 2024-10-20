package com.spl.wordle.service;

import com.spl.wordle.dto.GuessRequestDTO;
import com.spl.wordle.dto.GuessResponseDTO;
import com.spl.wordle.entity.Game;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface GameService {
    Flux<Game> getAllGames();
    Mono<Game> getGameById(Long id);
    Mono<GuessResponseDTO> createGame(Authentication authentication);
    Mono<GuessResponseDTO> update(GuessRequestDTO dto, Authentication authentication);
    Mono<Void> deleteGame(Long id);

}
