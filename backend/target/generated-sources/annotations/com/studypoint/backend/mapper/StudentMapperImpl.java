package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.StudentRequest;
import com.studypoint.backend.dto.response.StudentListResponse;
import com.studypoint.backend.dto.response.StudentResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.entity.Student;
import com.studypoint.backend.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:10+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class StudentMapperImpl implements StudentMapper {

    @Override
    public Student toStudent(StudentRequest request) {
        if ( request == null ) {
            return null;
        }

        Student student = new Student();

        student.setAdmissionDate( request.getAdmissionDate() );
        student.setBloodGroup( request.getBloodGroup() );
        student.setEmergencyContact( request.getEmergencyContact() );
        student.setGuardianEmail( request.getGuardianEmail() );
        student.setGuardianName( request.getGuardianName() );
        student.setGuardianPhone( request.getGuardianPhone() );
        student.setGuardianRelation( request.getGuardianRelation() );
        if ( request.getHostel() != null ) {
            student.setHostel( request.getHostel() );
        }
        student.setMedicalConditions( request.getMedicalConditions() );
        student.setPreviousGrade( request.getPreviousGrade() );
        student.setPreviousSchool( request.getPreviousSchool() );
        student.setRollNumber( request.getRollNumber() );
        if ( request.getTransport() != null ) {
            student.setTransport( request.getTransport() );
        }

        return student;
    }

    @Override
    public void updateStudentFromRequest(StudentRequest request, Student student) {
        if ( request == null ) {
            return;
        }

        if ( request.getAdmissionDate() != null ) {
            student.setAdmissionDate( request.getAdmissionDate() );
        }
        if ( request.getBloodGroup() != null ) {
            student.setBloodGroup( request.getBloodGroup() );
        }
        if ( request.getEmergencyContact() != null ) {
            student.setEmergencyContact( request.getEmergencyContact() );
        }
        if ( request.getGuardianEmail() != null ) {
            student.setGuardianEmail( request.getGuardianEmail() );
        }
        if ( request.getGuardianName() != null ) {
            student.setGuardianName( request.getGuardianName() );
        }
        if ( request.getGuardianPhone() != null ) {
            student.setGuardianPhone( request.getGuardianPhone() );
        }
        if ( request.getGuardianRelation() != null ) {
            student.setGuardianRelation( request.getGuardianRelation() );
        }
        if ( request.getHostel() != null ) {
            student.setHostel( request.getHostel() );
        }
        if ( request.getMedicalConditions() != null ) {
            student.setMedicalConditions( request.getMedicalConditions() );
        }
        if ( request.getPreviousGrade() != null ) {
            student.setPreviousGrade( request.getPreviousGrade() );
        }
        if ( request.getPreviousSchool() != null ) {
            student.setPreviousSchool( request.getPreviousSchool() );
        }
        if ( request.getRollNumber() != null ) {
            student.setRollNumber( request.getRollNumber() );
        }
        if ( request.getTransport() != null ) {
            student.setTransport( request.getTransport() );
        }
    }

    @Override
    public StudentResponse toStudentResponse(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentResponse studentResponse = new StudentResponse();

        studentResponse.setActive( student.isActive() );
        studentResponse.setAdmissionDate( student.getAdmissionDate() );
        studentResponse.setBloodGroup( student.getBloodGroup() );
        studentResponse.setCreatedAt( student.getCreatedAt() );
        studentResponse.setEmergencyContact( student.getEmergencyContact() );
        studentResponse.setGuardianEmail( student.getGuardianEmail() );
        studentResponse.setGuardianName( student.getGuardianName() );
        studentResponse.setGuardianPhone( student.getGuardianPhone() );
        studentResponse.setGuardianRelation( student.getGuardianRelation() );
        studentResponse.setHostel( student.isHostel() );
        studentResponse.setId( student.getId() );
        studentResponse.setMedicalConditions( student.getMedicalConditions() );
        studentResponse.setPreviousGrade( student.getPreviousGrade() );
        studentResponse.setPreviousSchool( student.getPreviousSchool() );
        studentResponse.setRollNumber( student.getRollNumber() );
        studentResponse.setTransport( student.isTransport() );
        studentResponse.setUser( userToUserResponse( student.getUser() ) );

        studentResponse.setFullName( student.getUser() != null ? student.getUser().getFirstName() + " " + student.getUser().getLastName() : null );
        studentResponse.setBatchName( student.getBatch() != null ? student.getBatch().getName() : null );

        return studentResponse;
    }

    @Override
    public StudentListResponse toStudentListResponse(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentListResponse studentListResponse = new StudentListResponse();

        studentListResponse.setActive( student.isActive() );
        studentListResponse.setAdmissionDate( student.getAdmissionDate() );
        studentListResponse.setId( student.getId() );
        studentListResponse.setRollNumber( student.getRollNumber() );

        studentListResponse.setFullName( student.getUser() != null ? student.getUser().getFirstName() + " " + student.getUser().getLastName() : null );
        studentListResponse.setBatchName( student.getBatch() != null ? student.getBatch().getName() : null );

        return studentListResponse;
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
