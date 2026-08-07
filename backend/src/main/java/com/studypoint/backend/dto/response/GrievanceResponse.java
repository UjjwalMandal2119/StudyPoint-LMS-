package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.GrievanceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GrievanceResponse {

    private Long id;
    private String trackingNumber;
    private String title;
    private String description;
    private String category;
    private Long userId;
    private String userName;
    private GrievanceStatus status;
    private String adminResponse;
    private Long resolvedBy;
    private LocalDateTime resolvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
