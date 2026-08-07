package com.studypoint.backend.dto.request;

import com.studypoint.backend.constants.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NotificationRequest {

    @NotNull(message = "Recipient user ID is required")
    private Long userId;

    private NotificationType type = NotificationType.INFO;

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message must not exceed 2000 characters")
    private String message;

    @Size(max = 500, message = "Action URL must not exceed 500 characters")
    private String actionUrl;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;
}
