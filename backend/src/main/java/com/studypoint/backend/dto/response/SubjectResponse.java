package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SubjectResponse {

    private Long id;
    private String name;
    private String code;
    private String description;
    private Long courseId;
    private String courseName;
    private Long teacherId;
    private Integer totalMarks;
    private Integer passMarks;
    private boolean practical;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}