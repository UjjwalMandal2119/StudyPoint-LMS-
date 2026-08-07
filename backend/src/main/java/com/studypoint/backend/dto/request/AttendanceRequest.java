package com.studypoint.backend.dto.request;

import com.studypoint.backend.constants.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {
    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Batch ID is required")
    private Long batchId;

    @NotNull(message = "Attendance date is required")
    private LocalDate attendanceDate;

    @NotNull(message = "Status is required")
    private AttendanceStatus status;

    @Size(max = 500, message = "Remarks must not exceed 500 characters")
    private String remarks;
}
