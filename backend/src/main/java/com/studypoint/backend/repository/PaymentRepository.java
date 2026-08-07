package com.studypoint.backend.repository;

import com.studypoint.backend.constants.PaymentStatus;
import com.studypoint.backend.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Page<Payment> findByFeeId(Long feeId, Pageable pageable);

    Page<Payment> findByStudentId(Long studentId, Pageable pageable);

    Page<Payment> findByStatus(PaymentStatus status, Pageable pageable);

    boolean existsByTransactionId(String transactionId);

    boolean existsByReceiptNumber(String receiptNumber);

    @Query("SELECT p FROM Payment p WHERE p.paymentDate BETWEEN :from AND :to")
    Page<Payment> findBetweenDates(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to, Pageable pageable);
}
