package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NoticeListResponse {

    private Long id;
    private String title;
    private LocalDate publishDate;
    private LocalDate expiryDate;
    private boolean important;
    private boolean published;
    private LocalDateTime createdAt;
}
