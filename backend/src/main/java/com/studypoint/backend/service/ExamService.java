package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.ExamRequest;
import com.studypoint.backend.dto.response.ExamListResponse;
import com.studypoint.backend.dto.response.ExamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ExamService {

    ExamResponse createExam(ExamRequest examRequest);

    ExamResponse updateExam(Long id, ExamRequest examRequest);

    void deleteExam(Long id);

    ExamResponse getExamById(Long id);

    Page<ExamListResponse> getAllExams(Pageable pageable);

    Page<ExamListResponse> getExamsByBatchId(Long batchId, Pageable pageable);

    Page<ExamListResponse> getExamsBySubjectId(Long subjectId, Pageable pageable);

    ExamResponse publishExam(Long id);
}