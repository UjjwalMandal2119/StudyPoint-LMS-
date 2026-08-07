package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.TeacherAttendanceRequest;
import com.studypoint.backend.dto.response.TeacherAttendanceResponse;
import com.studypoint.backend.entity.TeacherAttendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TeacherAttendanceMapper {
    @Mapping(target = "teacher", ignore = true)
    TeacherAttendance toTeacherAttendance(TeacherAttendanceRequest request);

    @Mapping(target = "teacherName", expression = "java(teacherAttendance.getTeacher() != null && teacherAttendance.getTeacher().getUser() != null ? teacherAttendance.getTeacher().getUser().getFirstName() + \" \" + teacherAttendance.getTeacher().getUser().getLastName() : null)")
    TeacherAttendanceResponse toTeacherAttendanceResponse(TeacherAttendance teacherAttendance);
}
