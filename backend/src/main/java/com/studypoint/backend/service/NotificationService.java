package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.NotificationRequest;
import com.studypoint.backend.dto.response.NotificationListResponse;
import com.studypoint.backend.dto.response.NotificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    NotificationResponse createNotification(NotificationRequest request);

    NotificationResponse getNotificationById(Long id);

    Page<NotificationListResponse> getMyNotifications(Long userId, Pageable pageable);

    Page<NotificationListResponse> getUnread(Long userId, Pageable pageable);

    long getUnreadCount(Long userId);

    NotificationResponse markAsRead(Long id);

    void markAllAsRead(Long userId);

    void deleteNotification(Long id);
}
