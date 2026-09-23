package com.studypoint.backend.config;

import com.studypoint.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * Spring Data JPA auditing configuration.
 *
 * <p>Populates {@code createdBy} / {@code updatedBy} on entities from the
 * currently authenticated user id, falling back to empty when the request is
 * unauthenticated (e.g. public admission submission).
 */
@Configuration
@RequiredArgsConstructor
public class AuditConfig {

    private final UserRepository userRepository;

    @Bean
    public AuditorAware<Long> auditorAware() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return Optional.empty();
            }
            Object principal = authentication.getPrincipal();
            if (principal instanceof org.springframework.security.core.userdetails.UserDetails details) {
                return userRepository.findByEmailOrUsername(details.getUsername(), details.getUsername())
                        .map(com.studypoint.backend.entity.User::getId);
            }
            return Optional.empty();
        };
    }
}