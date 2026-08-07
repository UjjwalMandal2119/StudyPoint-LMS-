package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    Page<Result> findByExamId(Long examId, Pageable pageable);

    Page<Result> findByStudentId(Long studentId, Pageable pageable);

    @Query("SELECT r FROM Result r WHERE r.exam.id = :examId AND r.student.id = :studentId")
    Result findByExamIdAndStudentId(@Param("examId") Long examId, @Param("studentId") Long studentId);

    Page<Result> findByExamIdAndPublishedAtIsNotNull(Long examId, Pageable pageable);
}
