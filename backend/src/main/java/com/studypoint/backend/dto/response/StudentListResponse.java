package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentListResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String rollNumber;
    private String batchName;
    private LocalDate admissionDate;
    private Boolean active;
}
