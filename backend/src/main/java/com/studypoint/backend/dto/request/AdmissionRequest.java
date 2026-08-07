package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AdmissionRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @NotBlank(message = "Phone is required")
    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @Size(max = 10, message = "Gender must not exceed 10 characters")
    private String gender;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @Size(max = 50, message = "City must not exceed 50 characters")
    private String city;

    @Size(max = 50, message = "State must not exceed 50 characters")
    private String state;

    @Size(max = 20, message = "Postal code must not exceed 20 characters")
    private String postalCode;

    @Size(max = 50, message = "Country must not exceed 50 characters")
    private String country;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    @Size(max = 100, message = "Previous school must not exceed 100 characters")
    private String previousSchool;

    @Size(max = 20, message = "Previous grade must not exceed 20 characters")
    private String previousGrade;

    @Size(max = 100, message = "Guardian name must not exceed 100 characters")
    private String guardianName;

    @Size(max = 20, message = "Guardian phone must not exceed 20 characters")
    private String guardianPhone;

    @Email(message = "Guardian email must be valid")
    @Size(max = 100, message = "Guardian email must not exceed 100 characters")
    private String guardianEmail;

    @Size(max = 1000, message = "Documents URL must not exceed 1000 characters")
    private String documentsUrl;
}
