package com.studypoint.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ResultResponse {

    private Long id;
    private Long examId;
    private String examTitle;
    private Long studentId;
    private String studentName;
    private int marksObtained;
    private double percentage;
    private String grade;
    private Integer rank;
    private boolean passed;
    private String remarks;
    private Long publishedBy;
    private LocalDateTime publishedAt;
    private boolean active;
    private LocalDateTime createdAt;
}