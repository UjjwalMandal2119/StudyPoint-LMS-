package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.EnrollmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AdmissionResponse {

    private Long id;
    private String applicationNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private Long courseId;
    private String courseName;
    private String previousSchool;
    private String previousGrade;
    private String guardianName;
    private String guardianPhone;
    private String guardianEmail;
    private EnrollmentStatus status;
    private String documentsUrl;
    private String remarks;
    private Long reviewedBy;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
