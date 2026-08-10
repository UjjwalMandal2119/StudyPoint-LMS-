package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    Page<Result> findByExamId(Long examId, Pageable pageable);

    Page<Result> findByStudentId(Long studentId, Pageable pageable);

    List<Result> findByStudentId(Long studentId);

    long countByStudentId(Long studentId);

    @Query("SELECT r FROM Result r WHERE r.exam.id = :examId AND r.student.id = :studentId")
    Result findByExamIdAndStudentId(@Param("examId") Long examId, @Param("studentId") Long studentId);

    Page<Result> findByExamIdAndPublishedAtIsNotNull(Long examId, Pageable pageable);

    @Query("SELECT AVG(r.percentage) FROM Result r WHERE r.student.id = :studentId")
    Double findAveragePercentageByStudentId(@Param("studentId") Long studentId);
}
