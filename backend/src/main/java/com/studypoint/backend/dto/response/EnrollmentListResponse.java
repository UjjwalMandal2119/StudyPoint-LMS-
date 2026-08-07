package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.EnrollmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentListResponse {
    private Long id;
    private String studentName;
    private String batchName;
    private EnrollmentStatus status;
    private LocalDate enrollmentDate;
}
