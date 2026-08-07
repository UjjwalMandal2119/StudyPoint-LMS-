package com.studypoint.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.studypoint.backend.constants.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserListResponse {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private Boolean emailVerified;
    private Boolean phoneVerified;
    private Boolean locked;
    private Boolean active;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}