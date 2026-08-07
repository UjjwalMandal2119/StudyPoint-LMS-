package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CourseRequest {

    @NotNull(message = "Course name is required")
    @Size(min = 2, max = 100, message = "Course name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "Course code is required")
    @Size(min = 2, max = 20, message = "Course code must be between 2 and 20 characters")
    private String code;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotNull(message = "Duration in months is required")
    private Integer durationMonths;

    @NotNull(message = "Fee is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Fee must be greater than 0")
    private BigDecimal fee;

    @DecimalMin(value = "0.0", inclusive = true, message = "Discount fee must be 0 or greater")
    private BigDecimal discountFee;

    @NotNull(message = "Maximum students is required")
    private Integer maxStudents;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @Size(max = 5000, message = "Syllabus must not exceed 5000 characters")
    private String syllabus;
}