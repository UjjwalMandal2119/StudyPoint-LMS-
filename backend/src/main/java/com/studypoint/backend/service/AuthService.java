package com.studypoint.backend.service;

import com.studypoint.backend.dto.auth.JwtAuthResponse;
import com.studypoint.backend.dto.auth.LoginRequest;
import com.studypoint.backend.dto.auth.RefreshTokenRequest;
import com.studypoint.backend.dto.auth.RegisterRequest;

public interface AuthService {

    JwtAuthResponse login(LoginRequest request);

    JwtAuthResponse register(RegisterRequest request);

    JwtAuthResponse refreshToken(RefreshTokenRequest request);

    void logout(Long userId);
}