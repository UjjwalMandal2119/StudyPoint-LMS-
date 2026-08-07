package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.auth.JwtAuthResponse;
import com.studypoint.backend.dto.auth.RegisterRequest;
import com.studypoint.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    User toUser(RegisterRequest request);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", expression = "java(user.getRole() != null ? user.getRole().name() : null)")
    @Mapping(target = "tokenType", constant = "Bearer")
    JwtAuthResponse toJwtAuthResponse(String accessToken, String refreshToken, User user);
}