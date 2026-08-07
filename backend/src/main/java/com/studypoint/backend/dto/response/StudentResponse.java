package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {
    private Long id;
    private Long userId;
    private UserResponse user;
    private Long batchId;
    private String batchName;
    private String fullName;
    private String rollNumber;
    private LocalDate admissionDate;
    private String guardianName;
    private String guardianPhone;
    private String guardianEmail;
    private String guardianRelation;
    private String previousSchool;
    private String previousGrade;
    private String medicalConditions;
    private String emergencyContact;
    private String bloodGroup;
    private Boolean hostel;
    private Boolean transport;
    private Boolean active;
    private LocalDateTime createdAt;
}
