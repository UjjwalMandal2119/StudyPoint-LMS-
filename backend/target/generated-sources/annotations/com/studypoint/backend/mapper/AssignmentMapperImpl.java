package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AssignmentRequest;
import com.studypoint.backend.dto.response.AssignmentListResponse;
import com.studypoint.backend.dto.response.AssignmentResponse;
import com.studypoint.backend.entity.Assignment;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Subject;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:10+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class AssignmentMapperImpl implements AssignmentMapper {

    @Override
    public AssignmentResponse toAssignmentResponse(Assignment assignment) {
        if ( assignment == null ) {
            return null;
        }

        AssignmentResponse assignmentResponse = new AssignmentResponse();

        assignmentResponse.setBatchName( assignmentBatchName( assignment ) );
        assignmentResponse.setSubjectName( assignmentSubjectName( assignment ) );
        assignmentResponse.setTeacherName( mapTeacherName( assignment.getTeacher() ) );
        assignmentResponse.setActive( assignment.isActive() );
        assignmentResponse.setCreatedAt( assignment.getCreatedAt() );
        assignmentResponse.setDescription( assignment.getDescription() );
        assignmentResponse.setDueDate( assignment.getDueDate() );
        assignmentResponse.setFileUrl( assignment.getFileUrl() );
        assignmentResponse.setId( assignment.getId() );
        assignmentResponse.setLateSubmissionAllowed( assignment.isLateSubmissionAllowed() );
        assignmentResponse.setStatus( assignment.getStatus() );
        assignmentResponse.setTitle( assignment.getTitle() );
        assignmentResponse.setTotalMarks( assignment.getTotalMarks() );

        return assignmentResponse;
    }

    @Override
    public AssignmentListResponse toAssignmentListResponse(Assignment assignment) {
        if ( assignment == null ) {
            return null;
        }

        AssignmentListResponse assignmentListResponse = new AssignmentListResponse();

        assignmentListResponse.setBatchName( assignmentBatchName( assignment ) );
        assignmentListResponse.setSubjectName( assignmentSubjectName( assignment ) );
        assignmentListResponse.setActive( assignment.isActive() );
        assignmentListResponse.setDueDate( assignment.getDueDate() );
        assignmentListResponse.setId( assignment.getId() );
        assignmentListResponse.setStatus( assignment.getStatus() );
        assignmentListResponse.setTitle( assignment.getTitle() );
        assignmentListResponse.setTotalMarks( assignment.getTotalMarks() );

        return assignmentListResponse;
    }

    @Override
    public Assignment toAssignment(AssignmentRequest assignmentRequest) {
        if ( assignmentRequest == null ) {
            return null;
        }

        Assignment assignment = new Assignment();

        assignment.setDescription( assignmentRequest.getDescription() );
        assignment.setDueDate( assignmentRequest.getDueDate() );
        assignment.setFileUrl( assignmentRequest.getFileUrl() );
        assignment.setLateSubmissionAllowed( assignmentRequest.isLateSubmissionAllowed() );
        assignment.setTitle( assignmentRequest.getTitle() );
        assignment.setTotalMarks( assignmentRequest.getTotalMarks() );

        return assignment;
    }

    private String assignmentBatchName(Assignment assignment) {
        Batch batch = assignment.getBatch();
        if ( batch == null ) {
            return null;
        }
        return batch.getName();
    }

    private String assignmentSubjectName(Assignment assignment) {
        Subject subject = assignment.getSubject();
        if ( subject == null ) {
            return null;
        }
        return subject.getName();
    }
}
