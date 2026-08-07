package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.EnrollmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long batchId;
    private String batchName;
    private EnrollmentStatus status;
    private LocalDate enrollmentDate;
    private Long approvedBy;
    private LocalDateTime approvedAt;
    private String remarks;
    private Boolean active;
    private LocalDateTime createdAt;
}
