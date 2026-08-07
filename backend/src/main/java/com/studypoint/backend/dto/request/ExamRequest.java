package com.studypoint.backend.dto.request;

import com.studypoint.backend.constants.ExamType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExamRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Batch ID is required")
    private Long batchId;

    @NotNull(message = "Subject ID is required")
    private Long subjectId;

    @NotNull(message = "Exam type is required")
    private ExamType examType;

    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    private LocalDateTime endTime;

    @NotNull(message = "Total marks is required")
    @Min(value = 1, message = "Total marks must be at least 1")
    private int totalMarks;

    @NotNull(message = "Pass marks is required")
    @Min(value = 0, message = "Pass marks must be at least 0")
    private int passMarks;

    private String instructions;
}