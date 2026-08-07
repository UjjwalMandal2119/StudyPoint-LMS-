package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.BatchRequest;
import com.studypoint.backend.dto.response.BatchListResponse;
import com.studypoint.backend.dto.response.BatchResponse;
import com.studypoint.backend.entity.Batch;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BatchMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Batch toBatch(BatchRequest request);

    @Mapping(target = "courseId", expression = "java(batch.getCourse() != null ? batch.getCourse().getId() : null)")
    @Mapping(target = "courseName", source = "course.name")
    @Mapping(target = "teacherId", expression = "java(batch.getTeacher() != null ? batch.getTeacher().getId() : null)")
    BatchResponse toBatchResponse(Batch batch);

    @Mapping(target = "courseName", source = "course.name")
        @Mapping(target = "teacherName", expression = "java(batch.getTeacher() != null ? batch.getTeacher().getFirstName() + ' ' + batch.getTeacher().getLastName() : null)")
    BatchListResponse toBatchListResponse(Batch batch);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "request.name")
    @Mapping(target = "code", source = "request.code")
    @Mapping(target = "startDate", source = "request.startDate")
    @Mapping(target = "endDate", source = "request.endDate")
    @Mapping(target = "classTime", source = "request.classTime")
    @Mapping(target = "classDays", source = "request.classDays")
    @Mapping(target = "roomNumber", source = "request.roomNumber")
    @Mapping(target = "maxStudents", source = "request.maxStudents")
    void updateBatch(BatchRequest request, @MappingTarget Batch batch);
}