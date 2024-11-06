package com.spl.gameservice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.spl.gameservice.enums.GameStatus;
import com.spl.gameservice.enums.LetterStatus;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuessResponseDTO {
    private Long gameId;
    private String guessedWord;
    private Integer currentTry;
    private GameStatus gameStatus;
    private List<LetterStatus> letterStatuses;
}
