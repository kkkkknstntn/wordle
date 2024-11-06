package com.spl.apigateway.entity;

import com.spl.apigateway.enums.Provider;
import com.spl.apigateway.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table("users")
public class User {
    @Id
    private Long id;
    private String username;
    private String password;
    private Integer wins;
    private Integer loses;
    private UserRole role;
    private String firstName;
    private String lastName;
    private Long vkId;
    private Provider provider;
    private boolean enabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
