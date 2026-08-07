package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentRequest {
    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Batch ID is required")
    private Long batchId;

    @Size(max = 1000, message = "Remarks must not exceed 1000 characters")
    private String remarks;
}
