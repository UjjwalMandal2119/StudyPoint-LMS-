package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.ExamType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExamListResponse {

    private Long id;
    private String title;
    private String batchName;
    private String subjectName;
    private ExamType examType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int totalMarks;
    private int passMarks;
    private boolean published;
    private boolean active;
}