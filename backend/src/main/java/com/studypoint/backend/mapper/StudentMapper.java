package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.StudentRequest;
import com.studypoint.backend.dto.response.StudentListResponse;
import com.studypoint.backend.dto.response.StudentResponse;
import com.studypoint.backend.entity.Student;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "batch", ignore = true)
    Student toStudent(StudentRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStudentFromRequest(StudentRequest request, @MappingTarget Student student);

    @Mapping(target = "fullName", expression = "java(student.getUser() != null ? student.getUser().getFirstName() + \" \" + student.getUser().getLastName() : null)")
    @Mapping(target = "batchName", expression = "java(student.getBatch() != null ? student.getBatch().getName() : null)")
    StudentResponse toStudentResponse(Student student);

    @Mapping(target = "fullName", expression = "java(student.getUser() != null ? student.getUser().getFirstName() + \" \" + student.getUser().getLastName() : null)")
    @Mapping(target = "batchName", expression = "java(student.getBatch() != null ? student.getBatch().getName() : null)")
    StudentListResponse toStudentListResponse(Student student);
}
