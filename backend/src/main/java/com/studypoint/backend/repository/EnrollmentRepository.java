package com.studypoint.backend.repository;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByStudentIdAndBatchId(Long studentId, Long batchId);

    List<Enrollment> findByStudentId(Long studentId);

    Page<Enrollment> findByStudentId(Long studentId, Pageable pageable);

    Page<Enrollment> findByBatchId(Long batchId, Pageable pageable);

    List<Enrollment> findByBatchId(Long batchId);

    List<Enrollment> findByBatchIdAndStatus(Long batchId, EnrollmentStatus status);

    long countByBatchId(Long batchId);

    long countByBatchIdAndStatus(Long batchId, EnrollmentStatus status);

    boolean existsByStudentIdAndBatchIdAndStatus(Long studentId, Long batchId, EnrollmentStatus status);
}