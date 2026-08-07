package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "teachers", indexes = {
        @Index(name = "idx_teacher_user", columnList = "user_id", unique = true)
})
public class Teacher extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "employee_id", unique = true, length = 20)
    private String employeeId;

    @Column(name = "qualification", length = 255)
    private String qualification;

    @Column(name = "specialization", length = 100)
    private String specialization;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "years_of_experience")
    private int yearsOfExperience;

    @Column(name = "salary", precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "bank_account_number", length = 30)
    private String bankAccountNumber;

    @Column(name = "bank_name", length = 100)
    private String bankName;

    @Column(name = "ifsc_code", length = 20)
    private String ifscCode;

    @Column(name = "pan_number", length = 20)
    private String panNumber;

    @Column(name = "aadhaar_number", length = 20)
    private String aadhaarNumber;

    @Column(name = "is_full_time", nullable = false)
    private boolean fullTime = true;
}