package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "certificates", indexes = {
        @Index(name = "idx_certificate_student", columnList = "student_id"),
        @Index(name = "idx_certificate_number", columnList = "certificate_number", unique = true)
})
public class Certificate extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "certificate_number", nullable = false, unique = true, length = 50)
    private String certificateNumber;

    @Column(name = "certificate_type", nullable = false, length = 50)
    private String certificateType;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "issued_by", nullable = false)
    private Long issuedBy;

    @Column(name = "is_verified", nullable = false)
    private boolean verified = false;

    @Column(name = "verification_code", length = 50)
    private String verificationCode;
}