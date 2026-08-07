package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.auth.JwtAuthResponse;
import com.studypoint.backend.dto.auth.RegisterRequest;
import com.studypoint.backend.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class AuthMapperImpl implements AuthMapper {

    @Override
    public User toUser(RegisterRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( request.getEmail() );
        user.setFirstName( request.getFirstName() );
        user.setLastName( request.getLastName() );
        user.setPassword( request.getPassword() );
        user.setPhone( request.getPhone() );
        user.setRole( request.getRole() );
        user.setUsername( request.getUsername() );

        return user;
    }

    @Override
    public JwtAuthResponse toJwtAuthResponse(String accessToken, String refreshToken, User user) {
        if ( accessToken == null && refreshToken == null && user == null ) {
            return null;
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();

        if ( user != null ) {
            jwtAuthResponse.setUserId( user.getId() );
            jwtAuthResponse.setUsername( user.getUsername() );
            jwtAuthResponse.setEmail( user.getEmail() );
        }
        jwtAuthResponse.setAccessToken( accessToken );
        jwtAuthResponse.setRefreshToken( refreshToken );
        jwtAuthResponse.setRole( user.getRole() != null ? user.getRole().name() : null );
        jwtAuthResponse.setTokenType( "Bearer" );

        return jwtAuthResponse;
    }
}
