package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.AssignmentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AssignmentListResponse {

    private Long id;
    private String title;
    private String batchName;
    private String subjectName;
    private LocalDateTime dueDate;
    private int totalMarks;
    private AssignmentStatus status;
    private boolean active;
}