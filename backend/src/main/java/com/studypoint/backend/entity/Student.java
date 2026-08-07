package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "students", indexes = {
        @Index(name = "idx_student_roll", columnList = "roll_number", unique = true),
        @Index(name = "idx_student_user", columnList = "user_id", unique = true),
        @Index(name = "idx_student_batch", columnList = "batch_id")
})
public class Student extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id")
    private Batch batch;

    @Column(name = "roll_number", unique = true, length = 20)
    private String rollNumber;

    @Column(name = "admission_date", nullable = false)
    private LocalDate admissionDate;

    @Column(name = "guardian_name", length = 100)
    private String guardianName;

    @Column(name = "guardian_phone", length = 20)
    private String guardianPhone;

    @Column(name = "guardian_email", length = 100)
    private String guardianEmail;

    @Column(name = "guardian_relation", length = 50)
    private String guardianRelation;

    @Column(name = "previous_school", length = 100)
    private String previousSchool;

    @Column(name = "previous_grade", length = 20)
    private String previousGrade;

    @Column(name = "medical_conditions", length = 1000)
    private String medicalConditions;

    @Column(name = "emergency_contact", length = 20)
    private String emergencyContact;

    @Column(name = "blood_group", length = 5)
    private String bloodGroup;

    @Column(name = "is_hostel", nullable = false)
    private boolean hostel = false;

    @Column(name = "is_transport", nullable = false)
    private boolean transport = false;
}