package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CourseListResponse {

    private Long id;
    private String name;
    private String code;
    private Integer durationMonths;
    private BigDecimal fee;
    private boolean published;
    private boolean active;
}