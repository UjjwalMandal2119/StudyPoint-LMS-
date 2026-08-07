package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.ResultRequest;
import com.studypoint.backend.dto.response.ResultListResponse;
import com.studypoint.backend.dto.response.ResultResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ResultService {

    ResultResponse createResult(ResultRequest resultRequest);

    ResultResponse publishResult(Long id);

    ResultResponse getResultById(Long id);

    Page<ResultResponse> getAllResults(Pageable pageable);

    Page<ResultResponse> getResultsByExamId(Long examId, Pageable pageable);

    Page<ResultResponse> getResultsByStudentId(Long studentId, Pageable pageable);

    ResultResponse getStudentResultForExam(Long examId, Long studentId);
}