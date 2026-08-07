package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.ResultRequest;
import com.studypoint.backend.dto.response.ResultListResponse;
import com.studypoint.backend.dto.response.ResultResponse;
import com.studypoint.backend.entity.Result;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ResultMapper {

    @Mapping(target = "examTitle", source = "exam.title")
    @Mapping(target = "studentName", source = "student", qualifiedByName = "studentName")
    ResultResponse toResultResponse(Result result);

    @Mapping(target = "examTitle", source = "exam.title")
    @Mapping(target = "studentName", source = "student", qualifiedByName = "studentName")
    ResultListResponse toResultListResponse(Result result);

    Result toResult(ResultRequest resultRequest);

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