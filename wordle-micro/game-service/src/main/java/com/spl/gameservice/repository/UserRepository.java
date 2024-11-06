package com.spl.gameservice.repository;

import com.spl.gameservice.entity.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Repository interface for managing User entities.
 */
public interface UserRepository extends R2dbcRepository<User, Long> {

    /**
     * Finds a user by their username.
     *
     * @param username the username of the user
     * @return a Mono containing the User if found, otherwise empty
     */
    Mono<User> findByUsername(String username);

    /**
     * Retrieves all users sorted by their win/loss ratio in descending order.
     *
     * @return a Flux of Users sorted by win/loss ratio
     */
    @Query("SELECT * FROM users ORDER BY (wins * 1.0 / CASE WHEN loses = 0 THEN 1 ELSE loses END) DESC")
    Flux<User> findAllSortedByWinLossRatio();

    /**
     * Retrieves a paginated list of users sorted by their win/loss ratio.
     *
     * @param size   the number of users to retrieve
     * @param offset the offset for pagination
     * @return a Flux of Users sorted by win/loss ratio
     */
    @Query("SELECT * FROM users ORDER BY (wins * 1.0 / CASE WHEN loses = 0 THEN 1 ELSE loses END)" +
            " DESC LIMIT :size OFFSET :offset")
    Flux<User> findAllSortedByWinLossRatio(@Param("size") int size, @Param("offset") int offset);

    /**
     * Retrieves all users sorted by wins in descending order.
     *
     * @return a Flux of Users sorted by wins
     */
    @Query("SELECT * FROM users ORDER BY wins DESC")
    Flux<User> findAllSortedByWins();

    /**
     * Retrieves a paginated list of users sorted by wins.
     *
     * @param size   the number of users to retrieve
     * @param offset the offset for pagination
     * @return a Flux of Users sorted by wins
     */
    @Query("SELECT * FROM users ORDER BY wins DESC LIMIT :size OFFSET :offset")
    Flux<User> findAllSortedByWins(@Param("size") int size, @Param("offset") int offset);


    @Query("""
            SELECT rank
            FROM (
                SELECT username,
                       ROW_NUMBER() OVER (ORDER BY wins DESC) AS rank
                FROM users
            ) AS ranked_users
            WHERE ranked_users.username = :username""")
    Mono<Integer> findUserRankByWins(@Param("username") String username);

    @Query("""
        SELECT rank
        FROM (
            SELECT username,
                   ROW_NUMBER() OVER (ORDER BY (wins * 1.0 / CASE WHEN loses = 0 THEN 1 ELSE loses END) DESC) AS rank
            FROM users
        ) AS ranked_users
        WHERE ranked_users.username = :username""")
    Mono<Integer> findUserRankByWinLossRatio(@Param("username") String username);
}