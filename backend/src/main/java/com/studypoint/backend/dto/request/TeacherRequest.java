package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherRequest {
    private Long userId;

    @NotBlank(message = "Employee ID is required")
    @Size(max = 20, message = "Employee ID must not exceed 20 characters")
    private String employeeId;

    @Size(max = 255, message = "Qualification must not exceed 255 characters")
    private String qualification;

    @Size(max = 100, message = "Specialization must not exceed 100 characters")
    private String specialization;

    private LocalDate joiningDate;

    @NotNull(message = "Years of experience is required")
    private Integer yearsOfExperience;

    private BigDecimal salary;

    @Size(max = 30, message = "Bank account number must not exceed 30 characters")
    private String bankAccountNumber;

    @Size(max = 100, message = "Bank name must not exceed 100 characters")
    private String bankName;

    @Size(max = 20, message = "IFSC code must not exceed 20 characters")
    private String ifscCode;

    @Size(max = 20, message = "PAN number must not exceed 20 characters")
    private String panNumber;

    @Size(max = 20, message = "Aadhaar number must not exceed 20 characters")
    private String aadhaarNumber;

    @NotNull(message = "Full time status is required")
    private Boolean fullTime;
}
