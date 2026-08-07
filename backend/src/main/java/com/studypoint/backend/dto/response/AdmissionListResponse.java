package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.EnrollmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AdmissionListResponse {

    private Long id;
    private String applicationNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String courseName;
    private EnrollmentStatus status;
    private LocalDateTime createdAt;
}
