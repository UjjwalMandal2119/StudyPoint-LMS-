package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AssignmentSubmissionRequest;
import com.studypoint.backend.dto.response.AssignmentSubmissionListResponse;
import com.studypoint.backend.dto.response.AssignmentSubmissionResponse;
import com.studypoint.backend.entity.Assignment;
import com.studypoint.backend.entity.AssignmentSubmission;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class AssignmentSubmissionMapperImpl implements AssignmentSubmissionMapper {

    @Override
    public AssignmentSubmissionResponse toAssignmentSubmissionResponse(AssignmentSubmission assignmentSubmission) {
        if ( assignmentSubmission == null ) {
            return null;
        }

        AssignmentSubmissionResponse assignmentSubmissionResponse = new AssignmentSubmissionResponse();

        assignmentSubmissionResponse.setAssignmentTitle( assignmentSubmissionAssignmentTitle( assignmentSubmission ) );
        assignmentSubmissionResponse.setStudentName( mapStudentName( assignmentSubmission.getStudent() ) );
        assignmentSubmissionResponse.setActive( assignmentSubmission.isActive() );
        assignmentSubmissionResponse.setCreatedAt( assignmentSubmission.getCreatedAt() );
        assignmentSubmissionResponse.setFeedback( assignmentSubmission.getFeedback() );
        assignmentSubmissionResponse.setFileUrl( assignmentSubmission.getFileUrl() );
        assignmentSubmissionResponse.setGradedAt( assignmentSubmission.getGradedAt() );
        assignmentSubmissionResponse.setGradedBy( assignmentSubmission.getGradedBy() );
        assignmentSubmissionResponse.setId( assignmentSubmission.getId() );
        assignmentSubmissionResponse.setMarksObtained( assignmentSubmission.getMarksObtained() );
        assignmentSubmissionResponse.setStatus( assignmentSubmission.getStatus() );
        assignmentSubmissionResponse.setSubmissionText( assignmentSubmission.getSubmissionText() );
        assignmentSubmissionResponse.setSubmittedAt( assignmentSubmission.getSubmittedAt() );

        return assignmentSubmissionResponse;
    }

    @Override
    public AssignmentSubmissionListResponse toAssignmentSubmissionListResponse(AssignmentSubmission assignmentSubmission) {
        if ( assignmentSubmission == null ) {
            return null;
        }

        AssignmentSubmissionListResponse assignmentSubmissionListResponse = new AssignmentSubmissionListResponse();

        assignmentSubmissionListResponse.setAssignmentTitle( assignmentSubmissionAssignmentTitle( assignmentSubmission ) );
        assignmentSubmissionListResponse.setStudentName( mapStudentName( assignmentSubmission.getStudent() ) );
        assignmentSubmissionListResponse.setId( assignmentSubmission.getId() );
        assignmentSubmissionListResponse.setMarksObtained( assignmentSubmission.getMarksObtained() );
        assignmentSubmissionListResponse.setStatus( assignmentSubmission.getStatus() );
        assignmentSubmissionListResponse.setSubmittedAt( assignmentSubmission.getSubmittedAt() );

        return assignmentSubmissionListResponse;
    }

    @Override
    public AssignmentSubmission toAssignmentSubmission(AssignmentSubmissionRequest assignmentSubmissionRequest) {
        if ( assignmentSubmissionRequest == null ) {
            return null;
        }

        AssignmentSubmission assignmentSubmission = new AssignmentSubmission();

        assignmentSubmission.setFileUrl( assignmentSubmissionRequest.getFileUrl() );
        assignmentSubmission.setSubmissionText( assignmentSubmissionRequest.getSubmissionText() );

        return assignmentSubmission;
    }

    private String assignmentSubmissionAssignmentTitle(AssignmentSubmission assignmentSubmission) {
        Assignment assignment = assignmentSubmission.getAssignment();
        if ( assignment == null ) {
            return null;
        }
        return assignment.getTitle();
    }
}
