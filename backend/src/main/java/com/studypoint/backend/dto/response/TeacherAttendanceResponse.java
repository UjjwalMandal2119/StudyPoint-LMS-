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
public class TeacherAttendanceResponse {
    private Long id;
    private Long teacherId;
    private String teacherName;
    private LocalDate attendanceDate;
    private AttendanceStatus status;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private Long markedBy;
    private String remarks;
    private Boolean active;
    private LocalDateTime createdAt;
}
