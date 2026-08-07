package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SubjectRequest {

    @NotNull(message = "Subject name is required")
    @Size(min = 2, max = 100, message = "Subject name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "Subject code is required")
    @Size(min = 2, max = 20, message = "Subject code must be between 2 and 20 characters")
    private String code;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    private Long teacherId;

    private Integer totalMarks;

    private Integer passMarks;

    private Boolean practical;
}