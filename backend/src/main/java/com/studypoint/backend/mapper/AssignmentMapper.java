package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AssignmentRequest;
import com.studypoint.backend.dto.response.AssignmentListResponse;
import com.studypoint.backend.dto.response.AssignmentResponse;
import com.studypoint.backend.entity.Assignment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AssignmentMapper {

    @Mapping(target = "batchName", source = "batch.name")
    @Mapping(target = "subjectName", source = "subject.name")
    @Mapping(target = "teacherName", source = "teacher", qualifiedByName = "teacherName")
    AssignmentResponse toAssignmentResponse(Assignment assignment);

    @Mapping(target = "batchName", source = "batch.name")
    @Mapping(target = "subjectName", source = "subject.name")
    AssignmentListResponse toAssignmentListResponse(Assignment assignment);

    Assignment toAssignment(AssignmentRequest assignmentRequest);

    @Named("teacherName")
    default String mapTeacherName(com.studypoint.backend.entity.Teacher teacher) {
        if (teacher == null || teacher.getUser() == null) {
            return null;
        }
        String firstName = teacher.getUser().getFirstName();
        String lastName = teacher.getUser().getLastName();
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