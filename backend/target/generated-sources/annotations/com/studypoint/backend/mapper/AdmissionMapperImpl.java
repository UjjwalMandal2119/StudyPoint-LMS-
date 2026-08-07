package com.studypoint.backend.mapper;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.dto.request.AdmissionRequest;
import com.studypoint.backend.dto.response.AdmissionListResponse;
import com.studypoint.backend.dto.response.AdmissionResponse;
import com.studypoint.backend.entity.AdmissionApplication;
import com.studypoint.backend.entity.Course;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class AdmissionMapperImpl implements AdmissionMapper {

    @Override
    public AdmissionApplication toAdmission(AdmissionRequest request) {
        if ( request == null ) {
            return null;
        }

        AdmissionApplication admissionApplication = new AdmissionApplication();

        admissionApplication.setAddress( request.getAddress() );
        admissionApplication.setCity( request.getCity() );
        admissionApplication.setCountry( request.getCountry() );
        admissionApplication.setDateOfBirth( request.getDateOfBirth() );
        admissionApplication.setDocumentsUrl( request.getDocumentsUrl() );
        admissionApplication.setEmail( request.getEmail() );
        admissionApplication.setFirstName( request.getFirstName() );
        admissionApplication.setGender( request.getGender() );
        admissionApplication.setGuardianEmail( request.getGuardianEmail() );
        admissionApplication.setGuardianName( request.getGuardianName() );
        admissionApplication.setGuardianPhone( request.getGuardianPhone() );
        admissionApplication.setLastName( request.getLastName() );
        admissionApplication.setPhone( request.getPhone() );
        admissionApplication.setPostalCode( request.getPostalCode() );
        admissionApplication.setPreviousGrade( request.getPreviousGrade() );
        admissionApplication.setPreviousSchool( request.getPreviousSchool() );
        admissionApplication.setState( request.getState() );

        return admissionApplication;
    }

    @Override
    public AdmissionResponse toAdmissionResponse(AdmissionApplication application) {
        if ( application == null ) {
            return null;
        }

        String courseName = null;
        String address = null;
        String applicationNumber = null;
        String city = null;
        String country = null;
        LocalDateTime createdAt = null;
        LocalDate dateOfBirth = null;
        String documentsUrl = null;
        String email = null;
        String firstName = null;
        String gender = null;
        String guardianEmail = null;
        String guardianName = null;
        String guardianPhone = null;
        Long id = null;
        String lastName = null;
        String phone = null;
        String postalCode = null;
        String previousGrade = null;
        String previousSchool = null;
        String remarks = null;
        LocalDateTime reviewedAt = null;
        Long reviewedBy = null;
        String state = null;
        EnrollmentStatus status = null;
        LocalDateTime updatedAt = null;

        courseName = applicationCourseName( application );
        address = application.getAddress();
        applicationNumber = application.getApplicationNumber();
        city = application.getCity();
        country = application.getCountry();
        createdAt = application.getCreatedAt();
        dateOfBirth = application.getDateOfBirth();
        documentsUrl = application.getDocumentsUrl();
        email = application.getEmail();
        firstName = application.getFirstName();
        gender = application.getGender();
        guardianEmail = application.getGuardianEmail();
        guardianName = application.getGuardianName();
        guardianPhone = application.getGuardianPhone();
        id = application.getId();
        lastName = application.getLastName();
        phone = application.getPhone();
        postalCode = application.getPostalCode();
        previousGrade = application.getPreviousGrade();
        previousSchool = application.getPreviousSchool();
        remarks = application.getRemarks();
        reviewedAt = application.getReviewedAt();
        reviewedBy = application.getReviewedBy();
        state = application.getState();
        status = application.getStatus();
        updatedAt = application.getUpdatedAt();

        Long courseId = application.getCourse() != null ? application.getCourse().getId() : null;

        AdmissionResponse admissionResponse = new AdmissionResponse( id, applicationNumber, firstName, lastName, email, phone, dateOfBirth, gender, address, city, state, postalCode, country, courseId, courseName, previousSchool, previousGrade, guardianName, guardianPhone, guardianEmail, status, documentsUrl, remarks, reviewedBy, reviewedAt, createdAt, updatedAt );

        return admissionResponse;
    }

    @Override
    public AdmissionListResponse toAdmissionListResponse(AdmissionApplication application) {
        if ( application == null ) {
            return null;
        }

        String courseName = null;
        String applicationNumber = null;
        LocalDateTime createdAt = null;
        String email = null;
        String firstName = null;
        Long id = null;
        String lastName = null;
        String phone = null;
        EnrollmentStatus status = null;

        courseName = applicationCourseName( application );
        applicationNumber = application.getApplicationNumber();
        createdAt = application.getCreatedAt();
        email = application.getEmail();
        firstName = application.getFirstName();
        id = application.getId();
        lastName = application.getLastName();
        phone = application.getPhone();
        status = application.getStatus();

        AdmissionListResponse admissionListResponse = new AdmissionListResponse( id, applicationNumber, firstName, lastName, email, phone, courseName, status, createdAt );

        return admissionListResponse;
    }

    @Override
    public void updateAdmission(AdmissionRequest request, AdmissionApplication application) {
        if ( request == null ) {
            return;
        }

        application.setFirstName( request.getFirstName() );
        application.setLastName( request.getLastName() );
        application.setEmail( request.getEmail() );
        application.setPhone( request.getPhone() );
        application.setDateOfBirth( request.getDateOfBirth() );
        application.setGender( request.getGender() );
        application.setAddress( request.getAddress() );
        application.setCity( request.getCity() );
        application.setState( request.getState() );
        application.setPostalCode( request.getPostalCode() );
        application.setCountry( request.getCountry() );
        application.setPreviousSchool( request.getPreviousSchool() );
        application.setPreviousGrade( request.getPreviousGrade() );
        application.setGuardianName( request.getGuardianName() );
        application.setGuardianPhone( request.getGuardianPhone() );
        application.setGuardianEmail( request.getGuardianEmail() );
        application.setDocumentsUrl( request.getDocumentsUrl() );
    }

    private String applicationCourseName(AdmissionApplication admissionApplication) {
        Course course = admissionApplication.getCourse();
        if ( course == null ) {
            return null;
        }
        return course.getName();
    }
}
