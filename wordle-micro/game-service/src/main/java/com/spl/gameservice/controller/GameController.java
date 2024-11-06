package com.spl.gameservice.controller;

import com.spl.gameservice.dto.GuessRequestDTO;
import com.spl.gameservice.dto.GuessResponseDTO;
import com.spl.gameservice.entity.Game;
import com.spl.gameservice.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @Operation(summary = "Получить все игры", description = "Получить список всех доступных игр.")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @Operation(summary = "Получить игру по ID", description = "Получить игру по ее уникальному идентификатору.")
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Game> getGameById(@PathVariable Long id) {
        return gameService.getGameById(id);
    }

    @Operation(summary = "Создать новую игру", description = "Создать новый экземпляр игры.")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<GuessResponseDTO> createGame(@RequestHeader(value = "X-User-Name", required = false) String name) {
        return gameService.createGame(name);
    }

    @Operation(summary = "Обновить угадывание пользователя",
            description = "Обновить угадывание пользователя для текущей игры.")
    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<GuessResponseDTO> updateGame(@RequestBody GuessRequestDTO guessDTO,
                                             @RequestHeader(value = "X-User-Name", required = false) String name){
        return gameService.update(guessDTO, name);
    }

    @Operation(summary = "Удалить игру", description = "Удалить игру по ее уникальному идентификатору.")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteUser(@PathVariable Long id) {
        return gameService.deleteGame(id);
    }
}
