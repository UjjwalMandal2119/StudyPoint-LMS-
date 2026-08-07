package com.studypoint.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.studypoint.backend.constants.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    private String gender;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String profileImageUrl;
    private Role role;
    private Boolean emailVerified;
    private Boolean phoneVerified;
    private Boolean locked;
    private Integer failedAttempts;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastLoginAt;

    private Boolean twoFactorEnabled;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    private Boolean active;
}