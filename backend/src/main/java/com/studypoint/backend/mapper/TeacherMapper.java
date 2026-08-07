package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.TeacherRequest;
import com.studypoint.backend.dto.response.TeacherListResponse;
import com.studypoint.backend.dto.response.TeacherResponse;
import com.studypoint.backend.entity.Teacher;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    @Mapping(target = "user", ignore = true)
    Teacher toTeacher(TeacherRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTeacherFromRequest(TeacherRequest request, @MappingTarget Teacher teacher);

    @Mapping(target = "fullName", expression = "java(teacher.getUser() != null ? teacher.getUser().getFirstName() + \" \" + teacher.getUser().getLastName() : null)")
    TeacherResponse toTeacherResponse(Teacher teacher);

    @Mapping(target = "fullName", expression = "java(teacher.getUser() != null ? teacher.getUser().getFirstName() + \" \" + teacher.getUser().getLastName() : null)")
    TeacherListResponse toTeacherListResponse(Teacher teacher);
}
