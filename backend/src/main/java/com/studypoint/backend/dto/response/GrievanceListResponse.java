package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.GrievanceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GrievanceListResponse {

    private Long id;
    private String trackingNumber;
    private String title;
    private String category;
    private String userName;
    private GrievanceStatus status;
    private LocalDateTime createdAt;
}
