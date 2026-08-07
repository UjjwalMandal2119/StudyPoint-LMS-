package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubjectListResponse {

    private Long id;
    private String name;
    private String code;
    private String courseName;
    private String teacherName;
    private Integer totalMarks;
    private Integer passMarks;
    private boolean practical;
    private boolean active;
}