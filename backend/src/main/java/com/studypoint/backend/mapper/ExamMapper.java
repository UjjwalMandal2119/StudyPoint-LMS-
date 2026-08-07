package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.ExamRequest;
import com.studypoint.backend.dto.response.ExamListResponse;
import com.studypoint.backend.dto.response.ExamResponse;
import com.studypoint.backend.entity.Exam;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ExamMapper {

    @Mapping(target = "batchName", source = "batch.name")
    @Mapping(target = "subjectName", source = "subject.name")
    ExamResponse toExamResponse(Exam exam);

    @Mapping(target = "batchName", source = "batch.name")
    @Mapping(target = "subjectName", source = "subject.name")
    ExamListResponse toExamListResponse(Exam exam);

    Exam toExam(ExamRequest examRequest);
}