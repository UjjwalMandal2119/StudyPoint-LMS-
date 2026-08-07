package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.ResultRequest;
import com.studypoint.backend.dto.response.ResultListResponse;
import com.studypoint.backend.dto.response.ResultResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.ResultService;
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
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResponseEntity<ApiResponse<ResultResponse>> createResult(@Valid @RequestBody ResultRequest resultRequest) {
        ResultResponse resultResponse = resultService.createResult(resultRequest);
        return ResponseEntity.ok(ApiResponse.success(resultResponse, "Result created successfully", 200));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<ResultResponse>> publishResult(@PathVariable Long id) {
        ResultResponse resultResponse = resultService.publishResult(id);
        return ResponseEntity.ok(ApiResponse.success(resultResponse, "Result published successfully", 200));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ResultResponse>>> getAllResults(Pageable pageable) {
        Page<ResultResponse> results = resultService.getAllResults(pageable);
        return ResponseEntity.ok(ApiResponse.success(results, "Results retrieved successfully", 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResultResponse>> getResultById(@PathVariable Long id) {
        ResultResponse resultResponse = resultService.getResultById(id);
        return ResponseEntity.ok(ApiResponse.success(resultResponse, "Result retrieved successfully", 200));
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<ApiResponse<Page<ResultResponse>>> getResultsByExamId(@PathVariable Long examId, Pageable pageable) {
        Page<ResultResponse> results = resultService.getResultsByExamId(examId, pageable);
        return ResponseEntity.ok(ApiResponse.success(results, "Results retrieved successfully", 200));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<Page<ResultResponse>>> getResultsByStudentId(@PathVariable Long studentId, Pageable pageable) {
        Page<ResultResponse> results = resultService.getResultsByStudentId(studentId, pageable);
        return ResponseEntity.ok(ApiResponse.success(results, "Results retrieved successfully", 200));
    }

    @GetMapping("/exam/{examId}/student/{studentId}")
    public ResponseEntity<ApiResponse<ResultResponse>> getStudentResultForExam(@PathVariable Long examId, @PathVariable Long studentId) {
        ResultResponse resultResponse = resultService.getStudentResultForExam(examId, studentId);
        return ResponseEntity.ok(ApiResponse.success(resultResponse, "Result retrieved successfully", 200));
    }
}