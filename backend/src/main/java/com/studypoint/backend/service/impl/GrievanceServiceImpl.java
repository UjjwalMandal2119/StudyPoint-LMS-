package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.GrievanceStatus;
import com.studypoint.backend.dto.request.GrievanceRequest;
import com.studypoint.backend.dto.request.GrievanceStatusRequest;
import com.studypoint.backend.dto.response.GrievanceListResponse;
import com.studypoint.backend.dto.response.GrievanceResponse;
import com.studypoint.backend.entity.Grievance;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.GrievanceMapper;
import com.studypoint.backend.repository.GrievanceRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.GrievanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GrievanceServiceImpl implements GrievanceService {

    private final GrievanceRepository grievanceRepository;
    private final UserRepository userRepository;
    private final GrievanceMapper grievanceMapper;

    @Override
    @Transactional
    public GrievanceResponse submitGrievance(GrievanceRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Grievance grievance = grievanceMapper.toGrievance(request);
        grievance.setUser(user);
        grievance.setTrackingNumber(generateTrackingNumber());
        Grievance saved = grievanceRepository.save(grievance);
        return grievanceMapper.toGrievanceResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public GrievanceResponse getGrievanceById(Long id) {
        Grievance grievance = grievanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance", "id", id));
        return grievanceMapper.toGrievanceResponse(grievance);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GrievanceListResponse> getAllGrievances(Pageable pageable) {
        return grievanceRepository.findAll(pageable).map(grievanceMapper::toGrievanceListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GrievanceListResponse> getGrievancesByUser(Long userId, Pageable pageable) {
        return grievanceRepository.findByUserId(userId, pageable).map(grievanceMapper::toGrievanceListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GrievanceListResponse> getGrievancesByStatus(GrievanceStatus status, Pageable pageable) {
        return grievanceRepository.findByStatus(status, pageable).map(grievanceMapper::toGrievanceListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GrievanceListResponse> getGrievancesByCategory(String category, Pageable pageable) {
        return grievanceRepository.findByCategory(category, pageable).map(grievanceMapper::toGrievanceListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GrievanceListResponse> searchGrievances(String search, Pageable pageable) {
        return grievanceRepository.search(search, pageable).map(grievanceMapper::toGrievanceListResponse);
    }

    @Override
    @Transactional
    public GrievanceResponse updateGrievanceStatus(Long id, GrievanceStatusRequest request, Long resolvedBy) {
        Grievance grievance = grievanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance", "id", id));
        grievance.setStatus(request.getStatus());
        if (request.getAdminResponse() != null) {
            grievance.setAdminResponse(request.getAdminResponse());
        }
        if (request.getStatus() == GrievanceStatus.RESOLVED || request.getStatus() == GrievanceStatus.REJECTED) {
            grievance.setResolvedBy(resolvedBy);
            grievance.setResolvedAt(LocalDateTime.now());
        }
        Grievance saved = grievanceRepository.save(grievance);
        return grievanceMapper.toGrievanceResponse(saved);
    }

    @Override
    @Transactional
    public void deleteGrievance(Long id) {
        Grievance grievance = grievanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance", "id", id));
        grievance.setActive(false);
        grievanceRepository.save(grievance);
    }

    private String generateTrackingNumber() {
        String trackingNumber;
        do {
            trackingNumber = "GRV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (grievanceRepository.existsByTrackingNumber(trackingNumber));
        return trackingNumber;
    }
}
