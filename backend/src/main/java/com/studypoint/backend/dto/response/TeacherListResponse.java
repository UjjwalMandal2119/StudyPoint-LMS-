package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherListResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String employeeId;
    private String specialization;
    private Integer yearsOfExperience;
    private Boolean fullTime;
    private Boolean active;
}
