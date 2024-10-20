package com.spl.wordle.repository;

import com.spl.wordle.entity.Game;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface GameRepository extends R2dbcRepository<Game, Long> {
}
