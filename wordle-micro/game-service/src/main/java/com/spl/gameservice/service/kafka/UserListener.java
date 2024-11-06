package com.spl.gameservice.service.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spl.gameservice.entity.User;
import com.spl.gameservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserListener {

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "auth_users", groupId = "user_group")
    public void listen(String message) {
        processMessage(message).subscribe();
    }

    private Mono<Void> processMessage(String message) {
        return Mono.defer(() -> {
            try {
                JsonNode jsonNode = objectMapper.readTree(message);
                String username = jsonNode.get("payload").get("username").asText();

                return userRepository.findByUsername(username)
                        .flatMap(existingUser -> {
                            existingUser.setWins(0);
                            existingUser.setLoses(0);
                            return userRepository.save(existingUser);
                        })
                        .switchIfEmpty(Mono.defer(() -> {
                            User newUser = new User();
                            newUser.setUsername(username);
                            newUser.setWins(0);
                            newUser.setLoses(0);
                            return userRepository.save(newUser);
                        }))
                        .then();
            } catch (Exception e) {
                log.error(e.getMessage());
                return Mono.empty();
            }
        });
    }
}
