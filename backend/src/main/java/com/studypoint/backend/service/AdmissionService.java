package com.studypoint.backend.service;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.dto.request.AdmissionRequest;
import com.studypoint.backend.dto.response.AdmissionListResponse;
import com.studypoint.backend.dto.response.AdmissionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdmissionService {

    AdmissionResponse createApplication(AdmissionRequest request);

    AdmissionResponse updateApplication(Long id, AdmissionRequest request);

    AdmissionResponse getApplicationById(Long id);

    Page<AdmissionListResponse> getAllApplications(Pageable pageable);

    Page<AdmissionListResponse> getApplicationsByStatus(EnrollmentStatus status, Pageable pageable);

    Page<AdmissionListResponse> getApplicationsByEmail(String email, Pageable pageable);

    AdmissionResponse reviewApplication(Long id, EnrollmentStatus status, Long reviewedBy, String remarks);

    void deleteApplication(Long id);
}
