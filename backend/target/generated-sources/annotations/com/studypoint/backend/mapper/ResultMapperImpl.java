package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.ResultRequest;
import com.studypoint.backend.dto.response.ResultListResponse;
import com.studypoint.backend.dto.response.ResultResponse;
import com.studypoint.backend.entity.Exam;
import com.studypoint.backend.entity.Result;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:11+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class ResultMapperImpl implements ResultMapper {

    @Override
    public ResultResponse toResultResponse(Result result) {
        if ( result == null ) {
            return null;
        }

        ResultResponse resultResponse = new ResultResponse();

        resultResponse.setExamTitle( resultExamTitle( result ) );
        resultResponse.setStudentName( mapStudentName( result.getStudent() ) );
        resultResponse.setActive( result.isActive() );
        resultResponse.setCreatedAt( result.getCreatedAt() );
        resultResponse.setGrade( result.getGrade() );
        resultResponse.setId( result.getId() );
        resultResponse.setMarksObtained( result.getMarksObtained() );
        resultResponse.setPassed( result.isPassed() );
        resultResponse.setPercentage( result.getPercentage() );
        resultResponse.setPublishedAt( result.getPublishedAt() );
        resultResponse.setPublishedBy( result.getPublishedBy() );
        resultResponse.setRank( result.getRank() );
        resultResponse.setRemarks( result.getRemarks() );

        return resultResponse;
    }

    @Override
    public ResultListResponse toResultListResponse(Result result) {
        if ( result == null ) {
            return null;
        }

        ResultListResponse resultListResponse = new ResultListResponse();

        resultListResponse.setExamTitle( resultExamTitle( result ) );
        resultListResponse.setStudentName( mapStudentName( result.getStudent() ) );
        resultListResponse.setGrade( result.getGrade() );
        resultListResponse.setId( result.getId() );
        resultListResponse.setMarksObtained( result.getMarksObtained() );
        resultListResponse.setPassed( result.isPassed() );
        resultListResponse.setPercentage( result.getPercentage() );
        resultListResponse.setRank( result.getRank() );

        return resultListResponse;
    }

    @Override
    public Result toResult(ResultRequest resultRequest) {
        if ( resultRequest == null ) {
            return null;
        }

        Result result = new Result();

        result.setGrade( resultRequest.getGrade() );
        result.setMarksObtained( resultRequest.getMarksObtained() );
        result.setPercentage( resultRequest.getPercentage() );
        result.setRank( resultRequest.getRank() );
        result.setRemarks( resultRequest.getRemarks() );

        return result;
    }

    private String resultExamTitle(Result result) {
        Exam exam = result.getExam();
        if ( exam == null ) {
            return null;
        }
        return exam.getTitle();
    }
}
