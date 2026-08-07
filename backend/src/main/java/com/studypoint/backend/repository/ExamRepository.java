package com.studypoint.backend.repository;

import com.studypoint.backend.constants.ExamType;
import com.studypoint.backend.entity.Exam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    Page<Exam> findByBatchId(Long batchId, Pageable pageable);

    Page<Exam> findBySubjectId(Long subjectId, Pageable pageable);

    Page<Exam> findByExamType(ExamType examType, Pageable pageable);

    Page<Exam> findByPublishedTrue(Pageable pageable);

    @Query("SELECT e FROM Exam e WHERE e.batch.id = :batchId AND e.subject.id = :subjectId")
    Page<Exam> findByBatchIdAndSubjectId(@Param("batchId") Long batchId, @Param("subjectId") Long subjectId, Pageable pageable);
}
