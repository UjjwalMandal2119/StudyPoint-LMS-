package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.TeacherRequest;
import com.studypoint.backend.dto.response.TeacherListResponse;
import com.studypoint.backend.dto.response.TeacherResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.entity.Teacher;
import com.studypoint.backend.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class TeacherMapperImpl implements TeacherMapper {

    @Override
    public Teacher toTeacher(TeacherRequest request) {
        if ( request == null ) {
            return null;
        }

        Teacher teacher = new Teacher();

        teacher.setAadhaarNumber( request.getAadhaarNumber() );
        teacher.setBankAccountNumber( request.getBankAccountNumber() );
        teacher.setBankName( request.getBankName() );
        teacher.setEmployeeId( request.getEmployeeId() );
        if ( request.getFullTime() != null ) {
            teacher.setFullTime( request.getFullTime() );
        }
        teacher.setIfscCode( request.getIfscCode() );
        teacher.setJoiningDate( request.getJoiningDate() );
        teacher.setPanNumber( request.getPanNumber() );
        teacher.setQualification( request.getQualification() );
        teacher.setSalary( request.getSalary() );
        teacher.setSpecialization( request.getSpecialization() );
        if ( request.getYearsOfExperience() != null ) {
            teacher.setYearsOfExperience( request.getYearsOfExperience() );
        }

        return teacher;
    }

    @Override
    public void updateTeacherFromRequest(TeacherRequest request, Teacher teacher) {
        if ( request == null ) {
            return;
        }

        if ( request.getAadhaarNumber() != null ) {
            teacher.setAadhaarNumber( request.getAadhaarNumber() );
        }
        if ( request.getBankAccountNumber() != null ) {
            teacher.setBankAccountNumber( request.getBankAccountNumber() );
        }
        if ( request.getBankName() != null ) {
            teacher.setBankName( request.getBankName() );
        }
        if ( request.getEmployeeId() != null ) {
            teacher.setEmployeeId( request.getEmployeeId() );
        }
        if ( request.getFullTime() != null ) {
            teacher.setFullTime( request.getFullTime() );
        }
        if ( request.getIfscCode() != null ) {
            teacher.setIfscCode( request.getIfscCode() );
        }
        if ( request.getJoiningDate() != null ) {
            teacher.setJoiningDate( request.getJoiningDate() );
        }
        if ( request.getPanNumber() != null ) {
            teacher.setPanNumber( request.getPanNumber() );
        }
        if ( request.getQualification() != null ) {
            teacher.setQualification( request.getQualification() );
        }
        if ( request.getSalary() != null ) {
            teacher.setSalary( request.getSalary() );
        }
        if ( request.getSpecialization() != null ) {
            teacher.setSpecialization( request.getSpecialization() );
        }
        if ( request.getYearsOfExperience() != null ) {
            teacher.setYearsOfExperience( request.getYearsOfExperience() );
        }
    }

    @Override
    public TeacherResponse toTeacherResponse(Teacher teacher) {
        if ( teacher == null ) {
            return null;
        }

        TeacherResponse teacherResponse = new TeacherResponse();

        teacherResponse.setAadhaarNumber( teacher.getAadhaarNumber() );
        teacherResponse.setActive( teacher.isActive() );
        teacherResponse.setBankAccountNumber( teacher.getBankAccountNumber() );
        teacherResponse.setBankName( teacher.getBankName() );
        teacherResponse.setCreatedAt( teacher.getCreatedAt() );
        teacherResponse.setEmployeeId( teacher.getEmployeeId() );
        teacherResponse.setFullTime( teacher.isFullTime() );
        teacherResponse.setId( teacher.getId() );
        teacherResponse.setIfscCode( teacher.getIfscCode() );
        teacherResponse.setJoiningDate( teacher.getJoiningDate() );
        teacherResponse.setPanNumber( teacher.getPanNumber() );
        teacherResponse.setQualification( teacher.getQualification() );
        teacherResponse.setSalary( teacher.getSalary() );
        teacherResponse.setSpecialization( teacher.getSpecialization() );
        teacherResponse.setUser( userToUserResponse( teacher.getUser() ) );
        teacherResponse.setYearsOfExperience( teacher.getYearsOfExperience() );

        teacherResponse.setFullName( teacher.getUser() != null ? teacher.getUser().getFirstName() + " " + teacher.getUser().getLastName() : null );

        return teacherResponse;
    }

    @Override
    public TeacherListResponse toTeacherListResponse(Teacher teacher) {
        if ( teacher == null ) {
            return null;
        }

        TeacherListResponse teacherListResponse = new TeacherListResponse();

        teacherListResponse.setActive( teacher.isActive() );
        teacherListResponse.setEmployeeId( teacher.getEmployeeId() );
        teacherListResponse.setFullTime( teacher.isFullTime() );
        teacherListResponse.setId( teacher.getId() );
        teacherListResponse.setSpecialization( teacher.getSpecialization() );
        teacherListResponse.setYearsOfExperience( teacher.getYearsOfExperience() );

        teacherListResponse.setFullName( teacher.getUser() != null ? teacher.getUser().getFirstName() + " " + teacher.getUser().getLastName() : null );

        return teacherListResponse;
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
