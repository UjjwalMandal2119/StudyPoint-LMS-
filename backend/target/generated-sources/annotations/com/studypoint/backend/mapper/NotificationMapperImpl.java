package com.studypoint.backend.mapper;

import com.studypoint.backend.constants.NotificationType;
import com.studypoint.backend.dto.request.NotificationRequest;
import com.studypoint.backend.dto.response.NotificationListResponse;
import com.studypoint.backend.dto.response.NotificationResponse;
import com.studypoint.backend.entity.Notification;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public Notification toNotification(NotificationRequest request) {
        if ( request == null ) {
            return null;
        }

        Notification notification = new Notification();

        notification.setActionUrl( request.getActionUrl() );
        notification.setImageUrl( request.getImageUrl() );
        notification.setMessage( request.getMessage() );
        notification.setTitle( request.getTitle() );
        notification.setType( request.getType() );

        return notification;
    }

    @Override
    public NotificationResponse toNotificationResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        String actionUrl = null;
        LocalDateTime createdAt = null;
        Long id = null;
        String imageUrl = null;
        String message = null;
        boolean read = false;
        LocalDateTime readAt = null;
        String title = null;
        NotificationType type = null;
        LocalDateTime updatedAt = null;

        actionUrl = notification.getActionUrl();
        createdAt = notification.getCreatedAt();
        id = notification.getId();
        imageUrl = notification.getImageUrl();
        message = notification.getMessage();
        read = notification.isRead();
        readAt = notification.getReadAt();
        title = notification.getTitle();
        type = notification.getType();
        updatedAt = notification.getUpdatedAt();

        Long userId = notification.getUser() != null ? notification.getUser().getId() : null;
        String userName = notification.getUser() != null ? notification.getUser().getFirstName() + ' ' + notification.getUser().getLastName() : null;

        NotificationResponse notificationResponse = new NotificationResponse( id, userId, userName, type, title, message, read, readAt, actionUrl, imageUrl, createdAt, updatedAt );

        return notificationResponse;
    }

    @Override
    public NotificationListResponse toNotificationListResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        LocalDateTime createdAt = null;
        Long id = null;
        String message = null;
        boolean read = false;
        String title = null;
        NotificationType type = null;

        createdAt = notification.getCreatedAt();
        id = notification.getId();
        message = notification.getMessage();
        read = notification.isRead();
        title = notification.getTitle();
        type = notification.getType();

        NotificationListResponse notificationListResponse = new NotificationListResponse( id, type, title, message, read, createdAt );

        return notificationListResponse;
    }
}
