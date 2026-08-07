package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.QuestionRequest;
import com.studypoint.backend.dto.response.QuestionListResponse;
import com.studypoint.backend.dto.response.QuestionResponse;
import com.studypoint.backend.entity.Question;
import com.studypoint.backend.entity.Subject;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:11+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public QuestionResponse toQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponse questionResponse = new QuestionResponse();

        questionResponse.setSubjectName( questionSubjectName( question ) );
        questionResponse.setActive( question.isActive() );
        questionResponse.setApproved( question.isApproved() );
        questionResponse.setCorrectAnswer( question.getCorrectAnswer() );
        questionResponse.setCreatedAt( question.getCreatedAt() );
        questionResponse.setCreatedBy( question.getCreatedBy() );
        questionResponse.setDifficultyLevel( question.getDifficultyLevel() );
        questionResponse.setExplanation( question.getExplanation() );
        questionResponse.setId( question.getId() );
        questionResponse.setMarks( question.getMarks() );
        questionResponse.setOptions( question.getOptions() );
        questionResponse.setQuestionText( question.getQuestionText() );
        questionResponse.setQuestionType( question.getQuestionType() );

        return questionResponse;
    }

    @Override
    public QuestionListResponse toQuestionListResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionListResponse questionListResponse = new QuestionListResponse();

        questionListResponse.setSubjectName( questionSubjectName( question ) );
        questionListResponse.setApproved( question.isApproved() );
        questionListResponse.setDifficultyLevel( question.getDifficultyLevel() );
        questionListResponse.setId( question.getId() );
        questionListResponse.setMarks( question.getMarks() );
        questionListResponse.setQuestionText( question.getQuestionText() );
        questionListResponse.setQuestionType( question.getQuestionType() );

        return questionListResponse;
    }

    @Override
    public Question toQuestion(QuestionRequest questionRequest) {
        if ( questionRequest == null ) {
            return null;
        }

        Question question = new Question();

        question.setCorrectAnswer( questionRequest.getCorrectAnswer() );
        question.setDifficultyLevel( questionRequest.getDifficultyLevel() );
        question.setExplanation( questionRequest.getExplanation() );
        question.setMarks( questionRequest.getMarks() );
        question.setOptions( questionRequest.getOptions() );
        question.setQuestionText( questionRequest.getQuestionText() );
        question.setQuestionType( questionRequest.getQuestionType() );

        return question;
    }

    private String questionSubjectName(Question question) {
        Subject subject = question.getSubject();
        if ( subject == null ) {
            return null;
        }
        return subject.getName();
    }
}
