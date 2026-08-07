package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.EnrollmentRequest;
import com.studypoint.backend.dto.response.EnrollmentListResponse;
import com.studypoint.backend.dto.response.EnrollmentResponse;
import com.studypoint.backend.entity.Enrollment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class EnrollmentMapperImpl implements EnrollmentMapper {

    @Override
    public Enrollment toEnrollment(EnrollmentRequest request) {
        if ( request == null ) {
            return null;
        }

        Enrollment enrollment = new Enrollment();

        enrollment.setRemarks( request.getRemarks() );

        return enrollment;
    }

    @Override
    public void updateEnrollmentFromRequest(EnrollmentRequest request, Enrollment enrollment) {
        if ( request == null ) {
            return;
        }

        if ( request.getRemarks() != null ) {
            enrollment.setRemarks( request.getRemarks() );
        }
    }

    @Override
    public EnrollmentResponse toEnrollmentResponse(Enrollment enrollment) {
        if ( enrollment == null ) {
            return null;
        }

        EnrollmentResponse enrollmentResponse = new EnrollmentResponse();

        enrollmentResponse.setActive( enrollment.isActive() );
        enrollmentResponse.setApprovedAt( enrollment.getApprovedAt() );
        enrollmentResponse.setApprovedBy( enrollment.getApprovedBy() );
        enrollmentResponse.setCreatedAt( enrollment.getCreatedAt() );
        enrollmentResponse.setEnrollmentDate( enrollment.getEnrollmentDate() );
        enrollmentResponse.setId( enrollment.getId() );
        enrollmentResponse.setRemarks( enrollment.getRemarks() );
        enrollmentResponse.setStatus( enrollment.getStatus() );

        enrollmentResponse.setStudentName( enrollment.getStudent() != null && enrollment.getStudent().getUser() != null ? enrollment.getStudent().getUser().getFirstName() + " " + enrollment.getStudent().getUser().getLastName() : null );
        enrollmentResponse.setBatchName( enrollment.getBatch() != null ? enrollment.getBatch().getName() : null );

        return enrollmentResponse;
    }

    @Override
    public EnrollmentListResponse toEnrollmentListResponse(Enrollment enrollment) {
        if ( enrollment == null ) {
            return null;
        }

        EnrollmentListResponse enrollmentListResponse = new EnrollmentListResponse();

        enrollmentListResponse.setEnrollmentDate( enrollment.getEnrollmentDate() );
        enrollmentListResponse.setId( enrollment.getId() );
        enrollmentListResponse.setStatus( enrollment.getStatus() );

        enrollmentListResponse.setStudentName( enrollment.getStudent() != null && enrollment.getStudent().getUser() != null ? enrollment.getStudent().getUser().getFirstName() + " " + enrollment.getStudent().getUser().getLastName() : null );
        enrollmentListResponse.setBatchName( enrollment.getBatch() != null ? enrollment.getBatch().getName() : null );

        return enrollmentListResponse;
    }
}
