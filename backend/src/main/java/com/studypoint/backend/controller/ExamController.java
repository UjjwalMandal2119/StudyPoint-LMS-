package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.ExamRequest;
import com.studypoint.backend.dto.response.ExamListResponse;
import com.studypoint.backend.dto.response.ExamResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.ExamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping
    public ResponseEntity<ApiResponse<ExamResponse>> createExam(@Valid @RequestBody ExamRequest examRequest) {
        ExamResponse examResponse = examService.createExam(examRequest);
        return ResponseEntity.ok(ApiResponse.success(examResponse, "Exam created successfully", 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ExamResponse>> updateExam(@PathVariable Long id, @Valid @RequestBody ExamRequest examRequest) {
        ExamResponse examResponse = examService.updateExam(id, examRequest);
        return ResponseEntity.ok(ApiResponse.success(examResponse, "Exam updated successfully", 200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.ok(ApiResponse.success("Exam deleted successfully", 200));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ExamListResponse>>> getAllExams(Pageable pageable) {
        Page<ExamListResponse> exams = examService.getAllExams(pageable);
        return ResponseEntity.ok(ApiResponse.success(exams, "Exams retrieved successfully", 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ExamResponse>> getExamById(@PathVariable Long id) {
        ExamResponse examResponse = examService.getExamById(id);
        return ResponseEntity.ok(ApiResponse.success(examResponse, "Exam retrieved successfully", 200));
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ApiResponse<Page<ExamListResponse>>> getExamsByBatchId(@PathVariable Long batchId, Pageable pageable) {
        Page<ExamListResponse> exams = examService.getExamsByBatchId(batchId, pageable);
        return ResponseEntity.ok(ApiResponse.success(exams, "Exams retrieved successfully", 200));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<ApiResponse<Page<ExamListResponse>>> getExamsBySubjectId(@PathVariable Long subjectId, Pageable pageable) {
        Page<ExamListResponse> exams = examService.getExamsBySubjectId(subjectId, pageable);
        return ResponseEntity.ok(ApiResponse.success(exams, "Exams retrieved successfully", 200));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<ExamResponse>> publishExam(@PathVariable Long id) {
        ExamResponse examResponse = examService.publishExam(id);
        return ResponseEntity.ok(ApiResponse.success(examResponse, "Exam published successfully", 200));
    }
}