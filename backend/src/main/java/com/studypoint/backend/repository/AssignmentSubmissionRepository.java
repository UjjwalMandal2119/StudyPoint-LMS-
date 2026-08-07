package com.studypoint.backend.repository;

import com.studypoint.backend.constants.SubmissionStatus;
import com.studypoint.backend.entity.AssignmentSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission, Long> {

    Page<AssignmentSubmission> findByAssignmentId(Long assignmentId, Pageable pageable);

    Page<AssignmentSubmission> findByStudentId(Long studentId, Pageable pageable);

    Page<AssignmentSubmission> findByAssignmentIdAndStudentId(Long assignmentId, Long studentId, Pageable pageable);

    Page<AssignmentSubmission> findByStatus(SubmissionStatus status, Pageable pageable);
}
