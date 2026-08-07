package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.dto.request.EnrollmentRequest;
import com.studypoint.backend.dto.response.EnrollmentListResponse;
import com.studypoint.backend.dto.response.EnrollmentResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Enrollment;
import com.studypoint.backend.entity.Student;
import com.studypoint.backend.exception.ConflictException;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.EnrollmentMapper;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.EnrollmentRepository;
import com.studypoint.backend.repository.StudentRepository;
import com.studypoint.backend.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;

    @Override
    public EnrollmentResponse enrollStudent(EnrollmentRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", request.getStudentId()));
        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", request.getBatchId()));

        if (enrollmentRepository.existsByStudentIdAndBatchIdAndStatus(request.getStudentId(), request.getBatchId(), EnrollmentStatus.ACTIVE)) {
            throw new ConflictException("Student is already actively enrolled in this batch");
        }

        Enrollment enrollment = enrollmentMapper.toEnrollment(request);
        enrollment.setStudent(student);
        enrollment.setBatch(batch);
        enrollment.setStatus(EnrollmentStatus.PENDING);
        enrollment.setEnrollmentDate(java.time.LocalDate.now());
        enrollment = enrollmentRepository.save(enrollment);
        return enrollmentMapper.toEnrollmentResponse(enrollment);
    }

    @Override
    public EnrollmentResponse approveEnrollment(Long id, Long approvedBy) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", "id", id));
        enrollment.setStatus(EnrollmentStatus.APPROVED);
        enrollment.setApprovedBy(approvedBy);
        enrollment.setApprovedAt(LocalDateTime.now());
        enrollment = enrollmentRepository.save(enrollment);
        return enrollmentMapper.toEnrollmentResponse(enrollment);
    }

    @Override
    public EnrollmentResponse rejectEnrollment(Long id, String remarks) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", "id", id));
        enrollment.setStatus(EnrollmentStatus.REJECTED);
        enrollment.setRemarks(remarks);
        enrollment = enrollmentRepository.save(enrollment);
        return enrollmentMapper.toEnrollmentResponse(enrollment);
    }

    @Override
    public EnrollmentResponse getEnrollmentById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", "id", id));
        return enrollmentMapper.toEnrollmentResponse(enrollment);
    }

    @Override
    public List<EnrollmentListResponse> getEnrollmentsByStudentId(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream()
                .map(enrollmentMapper::toEnrollmentListResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<EnrollmentListResponse> getEnrollmentsByBatchId(Long batchId) {
        return enrollmentRepository.findByBatchId(batchId).stream()
                .map(enrollmentMapper::toEnrollmentListResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<EnrollmentListResponse> getAllEnrollments(Pageable pageable) {
        return enrollmentRepository.findAll(pageable)
                .map(enrollmentMapper::toEnrollmentListResponse);
    }
}
