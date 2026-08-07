package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.NotificationRequest;
import com.studypoint.backend.dto.response.NotificationListResponse;
import com.studypoint.backend.dto.response.NotificationResponse;
import com.studypoint.backend.entity.Notification;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.NotificationMapper;
import com.studypoint.backend.repository.NotificationRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Override
    @Transactional
    public NotificationResponse createNotification(NotificationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        Notification notification = notificationMapper.toNotification(request);
        notification.setUser(user);
        return notificationMapper.toNotificationResponse(notificationRepository.save(notification));
    }

    @Override
    @Transactional(readOnly = true)
    public NotificationResponse getNotificationById(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        return notificationMapper.toNotificationResponse(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NotificationListResponse> getMyNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findByUserId(userId, pageable).map(notificationMapper::toNotificationListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NotificationListResponse> getUnread(Long userId, Pageable pageable) {
        return notificationRepository.findByUserIdAndReadFalse(userId, pageable).map(notificationMapper::toNotificationListResponse);
    }

    @Override
    public long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    @Override
    @Transactional
    public NotificationResponse markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        if (!notification.isRead()) {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
        }
        return notificationMapper.toNotificationResponse(notificationRepository.save(notification));
    }

    @Override
    @Transactional
    public void markAllAsRead(Long userId) {
        notificationRepository.findByUserIdAndReadFalse(userId, Pageable.unpaged())
                .forEach(n -> {
                    n.setRead(true);
                    n.setReadAt(LocalDateTime.now());
                    notificationRepository.save(n);
                });
    }

    @Override
    @Transactional
    public void deleteNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        notification.setActive(false);
        notificationRepository.save(notification);
    }
}
