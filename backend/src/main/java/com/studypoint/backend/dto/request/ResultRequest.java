package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultRequest {

    @NotNull(message = "Exam ID is required")
    private Long examId;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Marks obtained is required")
    @Min(value = 0, message = "Marks obtained must be at least 0")
    private int marksObtained;

    @NotNull(message = "Percentage is required")
    @Min(value = 0, message = "Percentage must be at least 0")
    @Max(value = 100, message = "Percentage must be at most 100")
    private double percentage;

    private String grade;

    private Integer rank;

    private String remarks;
}