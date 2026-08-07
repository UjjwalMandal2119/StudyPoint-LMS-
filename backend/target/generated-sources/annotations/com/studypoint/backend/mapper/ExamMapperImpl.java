package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.ExamRequest;
import com.studypoint.backend.dto.response.ExamListResponse;
import com.studypoint.backend.dto.response.ExamResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Exam;
import com.studypoint.backend.entity.Subject;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class ExamMapperImpl implements ExamMapper {

    @Override
    public ExamResponse toExamResponse(Exam exam) {
        if ( exam == null ) {
            return null;
        }

        ExamResponse examResponse = new ExamResponse();

        examResponse.setBatchName( examBatchName( exam ) );
        examResponse.setSubjectName( examSubjectName( exam ) );
        examResponse.setActive( exam.isActive() );
        examResponse.setCreatedAt( exam.getCreatedAt() );
        examResponse.setDescription( exam.getDescription() );
        examResponse.setEndTime( exam.getEndTime() );
        examResponse.setExamType( exam.getExamType() );
        examResponse.setId( exam.getId() );
        examResponse.setInstructions( exam.getInstructions() );
        examResponse.setPassMarks( exam.getPassMarks() );
        examResponse.setPublished( exam.isPublished() );
        examResponse.setStartTime( exam.getStartTime() );
        examResponse.setTitle( exam.getTitle() );
        examResponse.setTotalMarks( exam.getTotalMarks() );

        return examResponse;
    }

    @Override
    public ExamListResponse toExamListResponse(Exam exam) {
        if ( exam == null ) {
            return null;
        }

        ExamListResponse examListResponse = new ExamListResponse();

        examListResponse.setBatchName( examBatchName( exam ) );
        examListResponse.setSubjectName( examSubjectName( exam ) );
        examListResponse.setActive( exam.isActive() );
        examListResponse.setEndTime( exam.getEndTime() );
        examListResponse.setExamType( exam.getExamType() );
        examListResponse.setId( exam.getId() );
        examListResponse.setPassMarks( exam.getPassMarks() );
        examListResponse.setPublished( exam.isPublished() );
        examListResponse.setStartTime( exam.getStartTime() );
        examListResponse.setTitle( exam.getTitle() );
        examListResponse.setTotalMarks( exam.getTotalMarks() );

        return examListResponse;
    }

    @Override
    public Exam toExam(ExamRequest examRequest) {
        if ( examRequest == null ) {
            return null;
        }

        Exam exam = new Exam();

        exam.setDescription( examRequest.getDescription() );
        exam.setEndTime( examRequest.getEndTime() );
        exam.setExamType( examRequest.getExamType() );
        exam.setInstructions( examRequest.getInstructions() );
        exam.setPassMarks( examRequest.getPassMarks() );
        exam.setStartTime( examRequest.getStartTime() );
        exam.setTitle( examRequest.getTitle() );
        exam.setTotalMarks( examRequest.getTotalMarks() );

        return exam;
    }

    private String examBatchName(Exam exam) {
        Batch batch = exam.getBatch();
        if ( batch == null ) {
            return null;
        }
        return batch.getName();
    }

    private String examSubjectName(Exam exam) {
        Subject subject = exam.getSubject();
        if ( subject == null ) {
            return null;
        }
        return subject.getName();
    }
}
