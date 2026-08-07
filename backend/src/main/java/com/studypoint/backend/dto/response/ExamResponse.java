package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.ExamType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExamResponse {

    private Long id;
    private String title;
    private String description;
    private Long batchId;
    private String batchName;
    private Long subjectId;
    private String subjectName;
    private ExamType examType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int totalMarks;
    private int passMarks;
    private boolean published;
    private String instructions;
    private boolean active;
    private LocalDateTime createdAt;
}