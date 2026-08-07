package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class BatchListResponse {

    private Long id;
    private String name;
    private String code;
    private String courseName;
    private String teacherName;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean active;
}