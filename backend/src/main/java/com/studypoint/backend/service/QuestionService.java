package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.QuestionRequest;
import com.studypoint.backend.dto.response.QuestionListResponse;
import com.studypoint.backend.dto.response.QuestionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuestionService {

    QuestionResponse createQuestion(QuestionRequest questionRequest);

    List<QuestionResponse> createBulkQuestions(com.studypoint.backend.dto.request.BulkQuestionRequest bulkQuestionRequest);

    QuestionResponse updateQuestion(Long id, QuestionRequest questionRequest);

    void deleteQuestion(Long id);

    QuestionResponse getQuestionById(Long id);

    Page<QuestionResponse> getAllQuestions(Pageable pageable);

    Page<QuestionResponse> getQuestionsBySubjectId(Long subjectId, Pageable pageable);

    QuestionResponse approveQuestion(Long id);

    Page<QuestionResponse> getApprovedQuestionsBySubjectId(Long subjectId, Pageable pageable);
}