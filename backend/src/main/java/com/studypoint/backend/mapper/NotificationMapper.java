package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.NotificationRequest;
import com.studypoint.backend.dto.response.NotificationListResponse;
import com.studypoint.backend.dto.response.NotificationResponse;
import com.studypoint.backend.entity.Notification;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "read", ignore = true)
    @Mapping(target = "readAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Notification toNotification(NotificationRequest request);

    @Mapping(target = "userId", expression = "java(notification.getUser() != null ? notification.getUser().getId() : null)")
    @Mapping(target = "userName", expression = "java(notification.getUser() != null ? notification.getUser().getFirstName() + ' ' + notification.getUser().getLastName() : null)")
    NotificationResponse toNotificationResponse(Notification notification);

    NotificationListResponse toNotificationListResponse(Notification notification);
}
