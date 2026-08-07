package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest {
    private Long userId;
    private Long batchId;

    @NotBlank(message = "Roll number is required")
    @Size(max = 20, message = "Roll number must not exceed 20 characters")
    private String rollNumber;

    @NotNull(message = "Admission date is required")
    private LocalDate admissionDate;

    @NotBlank(message = "Guardian name is required")
    @Size(max = 100, message = "Guardian name must not exceed 100 characters")
    private String guardianName;

    @NotBlank(message = "Guardian phone is required")
    @Size(max = 20, message = "Guardian phone must not exceed 20 characters")
    private String guardianPhone;

    @Email(message = "Guardian email should be valid")
    @Size(max = 100, message = "Guardian email must not exceed 100 characters")
    private String guardianEmail;

    @Size(max = 50, message = "Guardian relation must not exceed 50 characters")
    private String guardianRelation;

    @Size(max = 100, message = "Previous school must not exceed 100 characters")
    private String previousSchool;

    @Size(max = 20, message = "Previous grade must not exceed 20 characters")
    private String previousGrade;

    @Size(max = 1000, message = "Medical conditions must not exceed 1000 characters")
    private String medicalConditions;

    @Size(max = 20, message = "Emergency contact must not exceed 20 characters")
    private String emergencyContact;

    @Size(max = 5, message = "Blood group must not exceed 5 characters")
    private String bloodGroup;

    private Boolean hostel;
    private Boolean transport;
}
