package com.spl.gameservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spl.gameservice.dto.GuessRequestDTO;
import com.spl.gameservice.dto.GuessResponseDTO;
import com.spl.gameservice.entity.Game;
import com.spl.gameservice.entity.User;
import com.spl.gameservice.enums.GameStatus;
import com.spl.gameservice.enums.LetterStatus;
import com.spl.gameservice.exception.ApiException;
import com.spl.gameservice.mapper.UserMapper;
import com.spl.gameservice.repository.GameRepository;
import com.spl.gameservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {
    private final static Integer MAXIMUM_TRIES = 6;
    private final GameRepository gameRepository;
    private final UserService userService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final Random random = new Random();
    private final List<String> words = loadWordsFromFile();

    @Override
    public Flux<Game> getAllGames() {
        return gameRepository.findAll()
                .flatMap(this::populateUser);
    }

    @Override
    public Mono<Game> getGameById(Long id) {
        return gameRepository.findById(id)
                .flatMap(this::populateUser);
    }

    @Override
    public Mono<GuessResponseDTO> createGame(String username) {
        String guessedWord = getRandomWord();

        Game newGame = buildNewGame(guessedWord);
        log.info("id: {}", username);
        return userService.findByUsername(username)
                .flatMap(user -> saveGameWithUserId(newGame, user.getId()))
                .switchIfEmpty(gameRepository.save(newGame)) // Save game without userId if no user found
                .map(game -> buildResponse(null, game, List.of()));
    }

    @Override
    public Mono<Void> deleteGame(Long id) {
        return gameRepository.deleteById(id);
    }

    @Override
    public Mono<GuessResponseDTO> update(GuessRequestDTO dto, String username) {
        return getGameById(dto.getGameId())
                .flatMap(game -> processGuess(dto.getGuessedWord().toUpperCase(), game, username))
                .switchIfEmpty(Mono.error(new ApiException("Invalid gameId", "INVALID_GAME_ID")));
    }

    private List<String> loadWordsFromFile() {
        try (InputStream inputStream = new ClassPathResource("words.json").getInputStream()) {
            ObjectMapper objectMapper = new ObjectMapper();
            List<String> words = objectMapper.readValue(inputStream,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));

            return words.stream()
                    .map(String::toUpperCase)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Failed to load words from file", e);
        }
    }


    private String getRandomWord() {
        return words.get(random.nextInt(words.size()));
    }

    private Game buildNewGame(String guessedWord) {
        return Game.builder()
                .currentTry(0)
                .gameStatus(GameStatus.IN_PROGRESS)
                .word(guessedWord)
                .build();
    }

    private Mono<Game> saveGameWithUserId(Game game, Long userId) {
        game.setUserId(userId);
        return gameRepository.save(game);
    }

    private Mono<GuessResponseDTO> processGuess(String guessedWord, Game game, String username) {
        validateGameStatus(game);
        validateGuessedWord(guessedWord);

        updateCurrentTry(game);

        List<LetterStatus> letterStatuses = evaluateGuess(game.getWord(), guessedWord);

        updateGameStatus(game, letterStatuses);

        return updateUserPointsIfAuthenticated(game, username)
                .then(gameRepository.save(game)
                        .switchIfEmpty(Mono.error(new ApiException("Invalid gameId", "INVALID_GAME_ID"))))
                .then(Mono.just(buildResponse(guessedWord, game, letterStatuses)));
    }

    private void validateGameStatus(Game game) {
        if (game.getGameStatus() != GameStatus.IN_PROGRESS) {
            throw new ApiException("Game has already ended", "MAXIMUM_ATTEMPTS");
        }
    }

    private void validateGuessedWord(String guessedWord) {
        if (!words.contains(guessedWord)) {
            throw new ApiException("This word is incorrect", "INVALID_WORD");
        }
    }

    private void updateCurrentTry(Game game) {
        if (game.getCurrentTry() >= MAXIMUM_TRIES) {
            throw new ApiException("Current try exceeds maximum allowed attempts.", "MAXIMUM_ATTEMPTS");
        }
        game.setCurrentTry(game.getCurrentTry() + 1);
    }

    private List<LetterStatus> evaluateGuess(String word, String guessedWord) {
        List<LetterStatus> letterStatuses = new ArrayList<>();

        for (int i = 0; i < word.length(); i++) {
            char character = word.charAt(i);
            char guessedCharacter = guessedWord.charAt(i);

            if (character == guessedCharacter) {
                letterStatuses.add(LetterStatus.CORRECT);
            } else if (word.indexOf(guessedCharacter) != -1) {
                letterStatuses.add(LetterStatus.MISPLACED);
            } else {
                letterStatuses.add(LetterStatus.NOT_PRESENT);
            }
        }

        return letterStatuses;
    }

    private void updateGameStatus(Game game, List<LetterStatus> letterStatuses) {
        if (letterStatuses.stream().allMatch(status -> status == LetterStatus.CORRECT)) {
            game.setGameStatus(GameStatus.WIN);
        } else if (game.getCurrentTry() >= 6) {
            game.setGameStatus(GameStatus.LOSE);
        } else {
            game.setGameStatus(GameStatus.IN_PROGRESS);
        }
    }

    private Mono<User> updateUserPointsIfAuthenticated(Game game, String username) {
        return userService.findByUsername(username)
                .flatMap(user -> updateUserWinsOrLoses(userMapper.responseMap(user), game))
                .onErrorResume(e -> Mono.empty());
    }

    private Mono<User> updateUserWinsOrLoses(User user, Game game) {
        if (game.getGameStatus() == GameStatus.WIN) {
            user.setWins(user.getWins() + 1);
        } else if (game.getGameStatus() == GameStatus.LOSE) {
            user.setLoses(user.getLoses() + 1);
        }

        return userRepository.save(user);
    }

    private GuessResponseDTO buildResponse(String guessedWord, Game game, List<LetterStatus> letterStatuses) {
        return GuessResponseDTO.builder()
                .gameId(game.getId())
                .guessedWord(guessedWord)
                .currentTry(game.getCurrentTry())
                .gameStatus(game.getGameStatus())
                .letterStatuses(letterStatuses)
                .build();
    }


    private Mono<Game> populateUser(Game game) {
        if (game.getUserId() == null) return Mono.just(game);

        return userService.getById(game.getUserId())
                .doOnNext(userDTO -> game.setUser(userMapper.responseMap(userDTO)))
                .thenReturn(game);
    }

    private Long parseId(String userId){
        return (userId == null? 0: Long.parseLong(userId));
    }
}