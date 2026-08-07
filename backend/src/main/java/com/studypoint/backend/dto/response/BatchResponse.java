package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class BatchResponse {

    private Long id;
    private String name;
    private String code;
    private Long courseId;
    private String courseName;
    private Long teacherId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime classTime;
    private String classDays;
    private String roomNumber;
    private Integer maxStudents;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}