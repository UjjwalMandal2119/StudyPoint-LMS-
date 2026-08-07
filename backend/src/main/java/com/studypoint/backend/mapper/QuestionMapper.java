package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.QuestionRequest;
import com.studypoint.backend.dto.response.QuestionListResponse;
import com.studypoint.backend.dto.response.QuestionResponse;
import com.studypoint.backend.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    @Mapping(target = "subjectName", source = "subject.name")
    QuestionResponse toQuestionResponse(Question question);

    @Mapping(target = "subjectName", source = "subject.name")
    QuestionListResponse toQuestionListResponse(Question question);

    Question toQuestion(QuestionRequest questionRequest);
}