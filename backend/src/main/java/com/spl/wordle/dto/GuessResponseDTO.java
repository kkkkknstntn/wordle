package com.spl.wordle.dto;

import com.spl.wordle.enums.GameStatus;
import com.spl.wordle.enums.LetterStatus;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GuessResponseDTO {
    private Long gameId;
    private String guessedWord;
    private Integer currentTry;
    private GameStatus gameStatus;
    private List<LetterStatus> letterStatuses;
}
