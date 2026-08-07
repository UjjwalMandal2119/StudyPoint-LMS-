package com.studypoint.backend.dto.request;

import com.studypoint.backend.constants.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherAttendanceRequest {
    @NotNull(message = "Teacher ID is required")
    private Long teacherId;

    @NotNull(message = "Attendance date is required")
    private LocalDate attendanceDate;

    @NotNull(message = "Status is required")
    private AttendanceStatus status;

    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;

    @Size(max = 500, message = "Remarks must not exceed 500 characters")
    private String remarks;
}
