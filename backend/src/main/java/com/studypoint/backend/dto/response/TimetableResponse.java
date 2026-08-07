package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TimetableResponse {

    private Long id;
    private Long batchId;
    private String batchName;
    private Long subjectId;
    private String subjectName;
    private Long teacherId;
    private String teacherName;
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomNumber;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}