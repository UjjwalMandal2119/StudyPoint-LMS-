package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AssignmentSubmissionRequest;
import com.studypoint.backend.dto.response.AssignmentSubmissionListResponse;
import com.studypoint.backend.dto.response.AssignmentSubmissionResponse;
import com.studypoint.backend.entity.AssignmentSubmission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AssignmentSubmissionMapper {

    @Mapping(target = "assignmentTitle", source = "assignment.title")
    @Mapping(target = "studentName", source = "student", qualifiedByName = "studentName")
    AssignmentSubmissionResponse toAssignmentSubmissionResponse(AssignmentSubmission assignmentSubmission);

    @Mapping(target = "assignmentTitle", source = "assignment.title")
    @Mapping(target = "studentName", source = "student", qualifiedByName = "studentName")
    AssignmentSubmissionListResponse toAssignmentSubmissionListResponse(AssignmentSubmission assignmentSubmission);

    AssignmentSubmission toAssignmentSubmission(AssignmentSubmissionRequest assignmentSubmissionRequest);

    @Named("studentName")
    default String mapStudentName(com.studypoint.backend.entity.Student student) {
        if (student == null || student.getUser() == null) {
            return null;
        }
        String firstName = student.getUser().getFirstName();
        String lastName = student.getUser().getLastName();
        if (firstName != null && lastName != null) {
            return firstName + " " + lastName;
        }
        if (firstName != null) {
            return firstName;
        }
        if (lastName != null) {
            return lastName;
        }
        return null;
    }
}