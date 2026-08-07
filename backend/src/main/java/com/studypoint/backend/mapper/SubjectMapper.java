package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.SubjectRequest;
import com.studypoint.backend.dto.response.SubjectListResponse;
import com.studypoint.backend.dto.response.SubjectResponse;
import com.studypoint.backend.entity.Subject;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SubjectMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Subject toSubject(SubjectRequest request);

    @Mapping(target = "courseId", expression = "java(subject.getCourse() != null ? subject.getCourse().getId() : null)")
    @Mapping(target = "courseName", source = "course.name")
    @Mapping(target = "teacherId", expression = "java(subject.getTeacher() != null ? subject.getTeacher().getId() : null)")
    SubjectResponse toSubjectResponse(Subject subject);

    @Mapping(target = "courseName", source = "course.name")
        @Mapping(target = "teacherName", expression = "java(subject.getTeacher() != null ? subject.getTeacher().getFirstName() + ' ' + subject.getTeacher().getLastName() : null)")
    SubjectListResponse toSubjectListResponse(Subject subject);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "request.name")
    @Mapping(target = "code", source = "request.code")
    @Mapping(target = "description", source = "request.description")
    @Mapping(target = "totalMarks", source = "request.totalMarks")
    @Mapping(target = "passMarks", source = "request.passMarks")
    @Mapping(target = "practical", source = "request.practical")
    void updateSubject(SubjectRequest request, @MappingTarget Subject subject);
}