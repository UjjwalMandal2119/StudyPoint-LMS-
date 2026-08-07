package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByUserId(Long userId);

    Optional<Student> findByRollNumber(String rollNumber);

    Page<Student> findByBatchId(Long batchId, Pageable pageable);

    List<Student> findByBatchId(Long batchId);

    boolean existsByRollNumber(String rollNumber);

    @Query("SELECT s FROM Student s JOIN s.user u WHERE " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.rollNumber) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Student> search(@Param("search") String search, Pageable pageable);

    long countByBatchId(Long batchId);

    @Query("SELECT s FROM Student s WHERE s.batch.id = :batchId AND s.user.active = true")
    List<Student> findActiveStudentsByBatchId(@Param("batchId") Long batchId);
}