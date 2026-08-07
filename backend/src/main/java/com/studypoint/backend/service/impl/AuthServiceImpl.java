package com.studypoint.backend.service.impl;

import com.studypoint.backend.mapper.AuthMapper;
import com.studypoint.backend.dto.auth.JwtAuthResponse;
import com.studypoint.backend.dto.auth.LoginRequest;
import com.studypoint.backend.dto.auth.RefreshTokenRequest;
import com.studypoint.backend.dto.auth.RegisterRequest;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.BadRequestException;
import com.studypoint.backend.exception.ConflictException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.security.JwtService;
import com.studypoint.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthMapper authMapper;

    @Override
    @Transactional
    public JwtAuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email is already in use");
        }

        User user = authMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        user.setEmailVerified(false);
        userRepository.save(user);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                !user.isLocked(),
                List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );

        String accessToken = jwtService.generateToken(userDetails, user.getId(), user.getRole().name());
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return authMapper.toJwtAuthResponse(accessToken, refreshToken, user);
    }

    @Override
    @Transactional
    public JwtAuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailOrUsername(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + request.getUsernameOrEmail()));

        if (user.isLocked()) {
            throw new BadRequestException("Account is locked. Please contact administrator.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            int newFailedAttempts = user.getFailedAttempts() + 1;
            userRepository.updateFailedAttempts(user.getEmail(), newFailedAttempts);

            if (newFailedAttempts >= 5) {
                                userRepository.updateLockStatus(user.getEmail(), true);
                throw new BadRequestException("Account is locked due to too many failed login attempts");
            }

            throw new BadRequestException("Invalid password. Attempt " + newFailedAttempts + " of 5");
        }

        userRepository.updateFailedAttempts(user.getEmail(), 0);
        userRepository.updateLastLogin(user.getId(), LocalDateTime.now(), "unknown");

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                !user.isLocked(),
                List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );

        String accessToken = jwtService.generateToken(userDetails, user.getId(), user.getRole().name());
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return authMapper.toJwtAuthResponse(accessToken, refreshToken, user);
    }

    @Override
    @Transactional
    public JwtAuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        if (!jwtService.isTokenValid(refreshToken)) {
            throw new BadRequestException("Invalid refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                !user.isLocked(),
                List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );

        String accessToken = jwtService.generateToken(userDetails, user.getId(), user.getRole().name());

        return authMapper.toJwtAuthResponse(accessToken, refreshToken, user);
    }

    @Override
    @Transactional
    public void logout(Long userId) {
    }
}