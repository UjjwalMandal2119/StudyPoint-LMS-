package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BatchRequest {

    @NotNull(message = "Batch name is required")
    @Size(min = 2, max = 100, message = "Batch name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "Batch code is required")
    @Size(min = 2, max = 20, message = "Batch code must be between 2 and 20 characters")
    private String code;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    private Long teacherId;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime classTime;

    @Size(max = 100, message = "Class days must not exceed 100 characters")
    private String classDays;

    @Size(max = 20, message = "Room number must not exceed 20 characters")
    private String roomNumber;

    private Integer maxStudents;
}