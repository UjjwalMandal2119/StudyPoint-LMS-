package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.CourseRequest;
import com.studypoint.backend.dto.response.CourseListResponse;
import com.studypoint.backend.dto.response.CourseResponse;
import com.studypoint.backend.entity.Course;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "published", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Course toCourse(CourseRequest request);

    CourseResponse toCourseResponse(Course course);

    CourseListResponse toCourseListResponse(Course course);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "request.name")
    @Mapping(target = "code", source = "request.code")
    @Mapping(target = "description", source = "request.description")
    @Mapping(target = "durationMonths", source = "request.durationMonths")
    @Mapping(target = "fee", source = "request.fee")
    @Mapping(target = "discountFee", source = "request.discountFee")
    @Mapping(target = "maxStudents", source = "request.maxStudents")
    @Mapping(target = "imageUrl", source = "request.imageUrl")
    @Mapping(target = "syllabus", source = "request.syllabus")
    void updateCourse(CourseRequest request, @MappingTarget Course course);
}