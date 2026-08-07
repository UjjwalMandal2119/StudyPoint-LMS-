package com.studypoint.backend.repository;

import com.studypoint.backend.constants.PaymentStatus;
import com.studypoint.backend.entity.Fee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {

    Page<Fee> findByStudentId(Long studentId, Pageable pageable);

    Page<Fee> findByStatus(PaymentStatus status, Pageable pageable);

    List<Fee> findByStudentIdAndStatus(Long studentId, PaymentStatus status);

    @Query("SELECT f FROM Fee f WHERE f.dueDate < :date AND f.status != 'PAID'")
    List<Fee> findOverdueFees(@Param("date") LocalDate date);
}
