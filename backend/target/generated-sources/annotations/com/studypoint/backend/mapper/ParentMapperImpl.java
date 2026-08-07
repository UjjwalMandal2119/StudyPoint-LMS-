package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.ParentRequest;
import com.studypoint.backend.dto.response.ParentResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.entity.Parent;
import com.studypoint.backend.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:11+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class ParentMapperImpl implements ParentMapper {

    @Override
    public Parent toParent(ParentRequest request) {
        if ( request == null ) {
            return null;
        }

        Parent parent = new Parent();

        parent.setAlternatePhone( request.getAlternatePhone() );
        parent.setAnnualIncome( request.getAnnualIncome() );
        parent.setOccupation( request.getOccupation() );
        if ( request.getPrimaryGuardian() != null ) {
            parent.setPrimaryGuardian( request.getPrimaryGuardian() );
        }

        return parent;
    }

    @Override
    public void updateParentFromRequest(ParentRequest request, Parent parent) {
        if ( request == null ) {
            return;
        }

        if ( request.getAlternatePhone() != null ) {
            parent.setAlternatePhone( request.getAlternatePhone() );
        }
        if ( request.getAnnualIncome() != null ) {
            parent.setAnnualIncome( request.getAnnualIncome() );
        }
        if ( request.getOccupation() != null ) {
            parent.setOccupation( request.getOccupation() );
        }
        if ( request.getPrimaryGuardian() != null ) {
            parent.setPrimaryGuardian( request.getPrimaryGuardian() );
        }
    }

    @Override
    public ParentResponse toParentResponse(Parent parent) {
        if ( parent == null ) {
            return null;
        }

        ParentResponse parentResponse = new ParentResponse();

        parentResponse.setActive( parent.isActive() );
        parentResponse.setAlternatePhone( parent.getAlternatePhone() );
        parentResponse.setAnnualIncome( parent.getAnnualIncome() );
        parentResponse.setCreatedAt( parent.getCreatedAt() );
        parentResponse.setId( parent.getId() );
        parentResponse.setOccupation( parent.getOccupation() );
        parentResponse.setPrimaryGuardian( parent.isPrimaryGuardian() );
        parentResponse.setUser( userToUserResponse( parent.getUser() ) );

        parentResponse.setStudentIds( parent.getStudents() != null ? parent.getStudents().stream().map(s -> s.getId()).toList() : null );

        return parentResponse;
    }

    protected UserResponse userToUserResponse(User user) {
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
}
