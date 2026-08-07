package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.UserRequest;
import com.studypoint.backend.dto.response.UserListResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:42+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setAddress( request.getAddress() );
        user.setCity( request.getCity() );
        user.setCountry( request.getCountry() );
        user.setDateOfBirth( request.getDateOfBirth() );
        user.setEmail( request.getEmail() );
        user.setFirstName( request.getFirstName() );
        user.setGender( request.getGender() );
        user.setLastName( request.getLastName() );
        user.setPassword( request.getPassword() );
        user.setPhone( request.getPhone() );
        user.setPostalCode( request.getPostalCode() );
        user.setProfileImageUrl( request.getProfileImageUrl() );
        user.setRole( request.getRole() );
        user.setState( request.getState() );
        user.setUsername( request.getUsername() );

        return user;
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setActive( user.isActive() );
        userResponse.setAddress( user.getAddress() );
        userResponse.setCity( user.getCity() );
        userResponse.setCountry( user.getCountry() );
        userResponse.setCreatedAt( user.getCreatedAt() );
        userResponse.setDateOfBirth( user.getDateOfBirth() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setEmailVerified( user.isEmailVerified() );
        userResponse.setFailedAttempts( user.getFailedAttempts() );
        userResponse.setFirstName( user.getFirstName() );
        userResponse.setGender( user.getGender() );
        userResponse.setId( user.getId() );
        userResponse.setLastLoginAt( user.getLastLoginAt() );
        userResponse.setLastName( user.getLastName() );
        userResponse.setLocked( user.isLocked() );
        userResponse.setPhone( user.getPhone() );
        userResponse.setPhoneVerified( user.isPhoneVerified() );
        userResponse.setPostalCode( user.getPostalCode() );
        userResponse.setProfileImageUrl( user.getProfileImageUrl() );
        userResponse.setRole( user.getRole() );
        userResponse.setState( user.getState() );
        userResponse.setTwoFactorEnabled( user.isTwoFactorEnabled() );
        userResponse.setUpdatedAt( user.getUpdatedAt() );
        userResponse.setUsername( user.getUsername() );

        return userResponse;
    }

    @Override
    public UserListResponse toUserListResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserListResponse userListResponse = new UserListResponse();

        userListResponse.setActive( user.isActive() );
        userListResponse.setCreatedAt( user.getCreatedAt() );
        userListResponse.setEmail( user.getEmail() );
        userListResponse.setEmailVerified( user.isEmailVerified() );
        userListResponse.setFirstName( user.getFirstName() );
        userListResponse.setId( user.getId() );
        userListResponse.setLastName( user.getLastName() );
        userListResponse.setLocked( user.isLocked() );
        userListResponse.setPhoneVerified( user.isPhoneVerified() );
        userListResponse.setRole( user.getRole() );
        userListResponse.setUsername( user.getUsername() );

        return userListResponse;
    }

    @Override
    public void updateUser(UserRequest request, User user) {
        if ( request == null ) {
            return;
        }

        if ( request.getAddress() != null ) {
            user.setAddress( request.getAddress() );
        }
        if ( request.getCity() != null ) {
            user.setCity( request.getCity() );
        }
        if ( request.getCountry() != null ) {
            user.setCountry( request.getCountry() );
        }
        if ( request.getDateOfBirth() != null ) {
            user.setDateOfBirth( request.getDateOfBirth() );
        }
        if ( request.getEmail() != null ) {
            user.setEmail( request.getEmail() );
        }
        if ( request.getFirstName() != null ) {
            user.setFirstName( request.getFirstName() );
        }
        if ( request.getGender() != null ) {
            user.setGender( request.getGender() );
        }
        if ( request.getLastName() != null ) {
            user.setLastName( request.getLastName() );
        }
        if ( request.getPassword() != null ) {
            user.setPassword( request.getPassword() );
        }
        if ( request.getPhone() != null ) {
            user.setPhone( request.getPhone() );
        }
        if ( request.getPostalCode() != null ) {
            user.setPostalCode( request.getPostalCode() );
        }
        if ( request.getProfileImageUrl() != null ) {
            user.setProfileImageUrl( request.getProfileImageUrl() );
        }
        if ( request.getRole() != null ) {
            user.setRole( request.getRole() );
        }
        if ( request.getState() != null ) {
            user.setState( request.getState() );
        }
        if ( request.getUsername() != null ) {
            user.setUsername( request.getUsername() );
        }
    }
}
