package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.EnrollmentRequest;
import com.studypoint.backend.dto.response.EnrollmentListResponse;
import com.studypoint.backend.dto.response.EnrollmentResponse;
import com.studypoint.backend.service.EnrollmentService;
import com.studypoint.backend.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<EnrollmentResponse>> enrollStudent(@Valid @RequestBody EnrollmentRequest request) {
        EnrollmentResponse response = enrollmentService.enrollStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response, "Student enrolled successfully", HttpStatus.CREATED.value()));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> approveEnrollment(@PathVariable Long id, @RequestParam Long approvedBy) {
        EnrollmentResponse response = enrollmentService.approveEnrollment(id, approvedBy);
        return ResponseEntity.ok(ApiResponse.success(response, "Enrollment approved successfully", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> rejectEnrollment(@PathVariable Long id, @RequestParam String remarks) {
        EnrollmentResponse response = enrollmentService.rejectEnrollment(id, remarks);
        return ResponseEntity.ok(ApiResponse.success(response, "Enrollment rejected successfully", HttpStatus.OK.value()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EnrollmentListResponse>>> getAllEnrollments(Pageable pageable) {
        Page<EnrollmentListResponse> enrollments = enrollmentService.getAllEnrollments(pageable);
        return ResponseEntity.ok(ApiResponse.success(enrollments, HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> getEnrollmentById(@PathVariable Long id) {
        EnrollmentResponse response = enrollmentService.getEnrollmentById(id);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<EnrollmentListResponse>>> getEnrollmentsByStudentId(@PathVariable Long studentId) {
        List<EnrollmentListResponse> enrollments = enrollmentService.getEnrollmentsByStudentId(studentId);
        return ResponseEntity.ok(ApiResponse.success(enrollments, HttpStatus.OK.value()));
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ApiResponse<List<EnrollmentListResponse>>> getEnrollmentsByBatchId(@PathVariable Long batchId) {
        List<EnrollmentListResponse> enrollments = enrollmentService.getEnrollmentsByBatchId(batchId);
        return ResponseEntity.ok(ApiResponse.success(enrollments, HttpStatus.OK.value()));
    }
}
