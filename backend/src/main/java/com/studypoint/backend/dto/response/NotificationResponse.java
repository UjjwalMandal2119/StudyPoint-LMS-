package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NotificationResponse {

    private Long id;
    private Long userId;
    private String userName;
    private NotificationType type;
    private String title;
    private String message;
    private boolean read;
    private LocalDateTime readAt;
    private String actionUrl;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
