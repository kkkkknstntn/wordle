package com.spl.gameservice.service;

import com.spl.gameservice.dto.GuessRequestDTO;
import com.spl.gameservice.dto.GuessResponseDTO;
import com.spl.gameservice.entity.Game;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface GameService {
    Flux<Game> getAllGames();
    Mono<Game> getGameById(Long id);
    Mono<GuessResponseDTO> createGame(String name);
    Mono<GuessResponseDTO> update(GuessRequestDTO dto, String name);
    Mono<Void> deleteGame(Long id);

}
