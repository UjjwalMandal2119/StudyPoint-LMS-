package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NotificationListResponse {

    private Long id;
    private NotificationType type;
    private String title;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;
}
