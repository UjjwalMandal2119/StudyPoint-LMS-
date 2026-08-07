package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CourseResponse {

    private Long id;
    private String name;
    private String code;
    private String description;
    private Integer durationMonths;
    private BigDecimal fee;
    private BigDecimal discountFee;
    private Integer maxStudents;
    private String imageUrl;
    private boolean published;
    private String syllabus;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}