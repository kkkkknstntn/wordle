package com.spl.gameservice.entity;

import com.spl.gameservice.entity.User;
import com.spl.gameservice.enums.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;


@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table("games")
public class Game {
    @Id
    private Long id;
    private String word;
    private Long userId;
    @Transient
    private User user;
    private GameStatus gameStatus;
    private Integer currentTry;

}
