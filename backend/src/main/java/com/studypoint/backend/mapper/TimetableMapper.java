package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.TimetableRequest;
import com.studypoint.backend.dto.response.TimetableListResponse;
import com.studypoint.backend.dto.response.TimetableResponse;
import com.studypoint.backend.entity.Timetable;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TimetableMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "batch", ignore = true)
    @Mapping(target = "subject", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Timetable toTimetable(TimetableRequest request);

    @Mapping(target = "batchId", expression = "java(timetable.getBatch() != null ? timetable.getBatch().getId() : null)")
    @Mapping(target = "batchName", source = "batch.name")
    @Mapping(target = "subjectId", expression = "java(timetable.getSubject() != null ? timetable.getSubject().getId() : null)")
    @Mapping(target = "subjectName", source = "subject.name")
    @Mapping(target = "teacherId", expression = "java(timetable.getTeacher() != null ? timetable.getTeacher().getId() : null)")
    @Mapping(target = "teacherName", expression = "java(timetable.getTeacher() != null && timetable.getTeacher().getUser() != null ? timetable.getTeacher().getUser().getFirstName() + \" \" + timetable.getTeacher().getUser().getLastName() : null)")
    TimetableResponse toTimetableResponse(Timetable timetable);

    @Mapping(target = "batchName", source = "batch.name")
    @Mapping(target = "subjectName", source = "subject.name")
    @Mapping(target = "teacherName", expression = "java(timetable.getTeacher() != null && timetable.getTeacher().getUser() != null ? timetable.getTeacher().getUser().getFirstName() + \" \" + timetable.getTeacher().getUser().getLastName() : null)")
    TimetableListResponse toTimetableListResponse(Timetable timetable);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "dayOfWeek", source = "request.dayOfWeek")
    @Mapping(target = "startTime", source = "request.startTime")
    @Mapping(target = "endTime", source = "request.endTime")
    @Mapping(target = "roomNumber", source = "request.roomNumber")
    void updateTimetable(TimetableRequest request, @MappingTarget Timetable timetable);
}