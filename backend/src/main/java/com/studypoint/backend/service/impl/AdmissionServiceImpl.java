package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.dto.request.AdmissionRequest;
import com.studypoint.backend.dto.response.AdmissionListResponse;
import com.studypoint.backend.dto.response.AdmissionResponse;
import com.studypoint.backend.entity.AdmissionApplication;
import com.studypoint.backend.entity.Course;
import com.studypoint.backend.exception.ConflictException;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.AdmissionMapper;
import com.studypoint.backend.repository.AdmissionApplicationRepository;
import com.studypoint.backend.repository.CourseRepository;
import com.studypoint.backend.service.AdmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdmissionServiceImpl implements AdmissionService {

    private final AdmissionApplicationRepository admissionRepository;
    private final CourseRepository courseRepository;
    private final AdmissionMapper admissionMapper;

    @Override
    @Transactional
    public AdmissionResponse createApplication(AdmissionRequest request) {
        if (admissionRepository.existsByEmailAndCourseId(request.getEmail(), request.getCourseId())) {
            throw new ConflictException("An admission application already exists for this email and course");
        }
        AdmissionApplication application = admissionMapper.toAdmission(request);
        application.setCourse(resolveCourse(request.getCourseId()));
        application.setApplicationNumber(generateApplicationNumber());
        application.setStatus(EnrollmentStatus.PENDING);
        AdmissionApplication saved = admissionRepository.save(application);
        return admissionMapper.toAdmissionResponse(saved);
    }

    @Override
    @Transactional
    public AdmissionResponse updateApplication(Long id, AdmissionRequest request) {
        AdmissionApplication application = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission application", "id", id));
        admissionMapper.updateAdmission(request, application);
        application.setCourse(resolveCourse(request.getCourseId()));
        AdmissionApplication saved = admissionRepository.save(application);
        return admissionMapper.toAdmissionResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public AdmissionResponse getApplicationById(Long id) {
        AdmissionApplication application = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission application", "id", id));
        return admissionMapper.toAdmissionResponse(application);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdmissionListResponse> getAllApplications(Pageable pageable) {
        return admissionRepository.findAll(pageable).map(admissionMapper::toAdmissionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdmissionListResponse> getApplicationsByStatus(EnrollmentStatus status, Pageable pageable) {
        return admissionRepository.findByStatus(status, pageable).map(admissionMapper::toAdmissionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdmissionListResponse> getApplicationsByEmail(String email, Pageable pageable) {
        return admissionRepository.findByEmail(email, pageable).map(admissionMapper::toAdmissionListResponse);
    }

    @Override
    @Transactional
    public AdmissionResponse reviewApplication(Long id, EnrollmentStatus status, Long reviewedBy, String remarks) {
        AdmissionApplication application = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission application", "id", id));
        application.setStatus(status);
        application.setRemarks(remarks);
        application.setReviewedBy(reviewedBy);
        application.setReviewedAt(LocalDateTime.now());
        AdmissionApplication saved = admissionRepository.save(application);
        return admissionMapper.toAdmissionResponse(saved);
    }

    @Override
    @Transactional
    public void deleteApplication(Long id) {
        AdmissionApplication application = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission application", "id", id));
        application.setActive(false);
        admissionRepository.save(application);
    }

    private Course resolveCourse(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
    }

    private String generateApplicationNumber() {
        return "ADM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
