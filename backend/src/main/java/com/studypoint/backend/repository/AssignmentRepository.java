package com.studypoint.backend.repository;

import com.studypoint.backend.constants.AssignmentStatus;
import com.studypoint.backend.entity.Assignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Page<Assignment> findByBatchId(Long batchId, Pageable pageable);

    Page<Assignment> findBySubjectId(Long subjectId, Pageable pageable);

    Page<Assignment> findByTeacherId(Long teacherId, Pageable pageable);

    Page<Assignment> findByStatus(AssignmentStatus status, Pageable pageable);

    @Query("SELECT a FROM Assignment a WHERE a.batch.id = :batchId AND a.subject.id = :subjectId")
    Page<Assignment> findByBatchIdAndSubjectId(@Param("batchId") Long batchId, @Param("subjectId") Long subjectId, Pageable pageable);
}
