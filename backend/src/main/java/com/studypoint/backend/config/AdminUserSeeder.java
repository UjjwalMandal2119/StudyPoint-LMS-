package com.studypoint.backend.config;

import com.studypoint.backend.constants.Role;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Ensures the application is usable out of the box by creating a default
 * super-admin account when no super-admin exists in the database.
 *
 * <p> Default credentials: {@code admin} / {@code Admin@123}.
 */
@Slf4j
@Component
@Order(1)
@RequiredArgsConstructor
public class AdminUserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        boolean hasSuperAdmin = userRepository.findByRole(Role.SUPER_ADMIN, org.springframework.data.domain.Pageable.unpaged())
                .getContent()
                .stream()
                .anyMatch(User::isActive);

        if (!hasSuperAdmin) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@studypoint.lms");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setFirstName("System");
            admin.setLastName("Administrator");
            admin.setPhone("0000000000");
            admin.setRole(Role.SUPER_ADMIN);
            admin.setActive(true);
            admin.setEmailVerified(true);
            admin.setPhoneVerified(true);
            admin.setLocked(false);
            admin.setFailedAttempts(0);
            userRepository.save(admin);
            log.info("Created default super-admin user 'admin' with password 'Admin@123'");
        } else {
            log.info("Super-admin user already exists - skipping default admin creation");
        }
    }
}