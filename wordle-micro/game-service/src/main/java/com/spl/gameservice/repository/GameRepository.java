package com.spl.gameservice.repository;

import com.spl.gameservice.entity.Game;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface GameRepository extends R2dbcRepository<Game, Long> {
}
