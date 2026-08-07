package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long batchId;
    private String batchName;
    private LocalDate attendanceDate;
    private AttendanceStatus status;
    private Long markedBy;
    private String remarks;
    private Boolean active;
    private LocalDateTime createdAt;
}
