package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.EnrollmentRequest;
import com.studypoint.backend.dto.response.EnrollmentListResponse;
import com.studypoint.backend.dto.response.EnrollmentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EnrollmentService {
    EnrollmentResponse enrollStudent(EnrollmentRequest request);
    EnrollmentResponse approveEnrollment(Long id, Long approvedBy);
    EnrollmentResponse rejectEnrollment(Long id, String remarks);
    EnrollmentResponse getEnrollmentById(Long id);
    java.util.List<EnrollmentListResponse> getEnrollmentsByStudentId(Long studentId);
    java.util.List<EnrollmentListResponse> getEnrollmentsByBatchId(Long batchId);
    Page<EnrollmentListResponse> getAllEnrollments(Pageable pageable);
}
