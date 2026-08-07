package com.studypoint.backend.repository;

import com.studypoint.backend.constants.Role;
import com.studypoint.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmailOrUsername(String email, String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Page<User> findByRole(Role role, Pageable pageable);

    List<User> findByRoleIn(List<Role> roles);

    @Query("SELECT u FROM User u WHERE " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.username) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<User> search(@Param("search") String search, Pageable pageable);

    @Modifying
    @Query("UPDATE User u SET u.failedAttempts = :count WHERE u.email = :email")
    void updateFailedAttempts(@Param("email") String email, @Param("count") int count);

    @Modifying
    @Query("UPDATE User u SET u.locked = :locked WHERE u.email = :email")
    void updateLockStatus(@Param("email") String email, @Param("locked") boolean locked);

    @Modifying
    @Query("UPDATE User u SET u.lastLoginAt = :timestamp, u.lastLoginIp = :ip WHERE u.id = :userId")
    void updateLastLogin(@Param("userId") Long userId,
                         @Param("timestamp") LocalDateTime timestamp,
                         @Param("ip") String ip);

    long countByRole(Role role);
}