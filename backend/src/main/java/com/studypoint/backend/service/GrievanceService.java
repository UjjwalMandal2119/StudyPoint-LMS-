package com.studypoint.backend.service;

import com.studypoint.backend.constants.GrievanceStatus;
import com.studypoint.backend.dto.request.GrievanceRequest;
import com.studypoint.backend.dto.request.GrievanceStatusRequest;
import com.studypoint.backend.dto.response.GrievanceListResponse;
import com.studypoint.backend.dto.response.GrievanceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GrievanceService {

    GrievanceResponse submitGrievance(GrievanceRequest request, Long userId);

    GrievanceResponse getGrievanceById(Long id);

    Page<GrievanceListResponse> getAllGrievances(Pageable pageable);

    Page<GrievanceListResponse> getGrievancesByUser(Long userId, Pageable pageable);

    Page<GrievanceListResponse> getGrievancesByStatus(GrievanceStatus status, Pageable pageable);

    Page<GrievanceListResponse> getGrievancesByCategory(String category, Pageable pageable);

    Page<GrievanceListResponse> searchGrievances(String search, Pageable pageable);

    GrievanceResponse updateGrievanceStatus(Long id, GrievanceStatusRequest request, Long resolvedBy);

    void deleteGrievance(Long id);
}
