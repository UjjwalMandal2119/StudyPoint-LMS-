package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherResponse {
    private Long id;
    private Long userId;
    private UserResponse user;
    private String fullName;
    private String employeeId;
    private String qualification;
    private String specialization;
    private LocalDate joiningDate;
    private Integer yearsOfExperience;
    private BigDecimal salary;
    private String bankAccountNumber;
    private String bankName;
    private String ifscCode;
    private String panNumber;
    private String aadhaarNumber;
    private Boolean fullTime;
    private Boolean active;
    private LocalDateTime createdAt;
}
