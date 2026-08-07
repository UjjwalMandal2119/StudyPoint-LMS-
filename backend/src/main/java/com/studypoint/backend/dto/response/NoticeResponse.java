package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NoticeResponse {

    private Long id;
    private String title;
    private String content;
    private LocalDate publishDate;
    private LocalDate expiryDate;
    private boolean important;
    private Long publishedBy;
    private String authorName;
    private boolean published;
    private String attachmentUrl;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
