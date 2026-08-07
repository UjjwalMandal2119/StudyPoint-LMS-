package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Certificate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    Page<Certificate> findByStudentId(Long studentId, Pageable pageable);

    boolean existsByCertificateNumber(String certificateNumber);

    boolean existsByVerificationCode(String verificationCode);
}
