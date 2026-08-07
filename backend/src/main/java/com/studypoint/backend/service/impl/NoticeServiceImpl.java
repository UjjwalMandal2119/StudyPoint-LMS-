package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.NoticeRequest;
import com.studypoint.backend.dto.response.NoticeListResponse;
import com.studypoint.backend.dto.response.NoticeResponse;
import com.studypoint.backend.entity.Notice;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.NoticeMapper;
import com.studypoint.backend.repository.NoticeRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final NoticeMapper noticeMapper;

    @Override
    @Transactional
    public NoticeResponse createNotice(NoticeRequest request, Long publishedBy) {
        Notice notice = noticeMapper.toNotice(request);
        notice.setPublishedBy(publishedBy);
        notice.setPublished(true);
        notice.setPublishedAt(LocalDateTime.now());
        return toResponse(noticeRepository.save(notice));
    }

    @Override
    @Transactional
    public NoticeResponse updateNotice(Long id, NoticeRequest request) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice", "id", id));
        noticeMapper.updateNotice(request, notice);
        return toResponse(noticeRepository.save(notice));
    }

    @Override
    @Transactional
    public NoticeResponse publishNotice(Long id, Long publishedBy) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice", "id", id));
        notice.setPublished(true);
        notice.setPublishedBy(publishedBy);
        notice.setPublishedAt(LocalDateTime.now());
        return toResponse(noticeRepository.save(notice));
    }

    @Override
    @Transactional
    public NoticeResponse unpublishNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice", "id", id));
        notice.setPublished(false);
        return toResponse(noticeRepository.save(notice));
    }

    @Override
    public NoticeResponse getNoticeById(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice", "id", id));
        return toResponse(notice);
    }

    @Override
    public Page<NoticeListResponse> getAllNotices(Pageable pageable) {
        return noticeRepository.findAll(pageable).map(noticeMapper::toNoticeListResponse);
    }

    @Override
    public Page<NoticeListResponse> getPublishedNotices(Pageable pageable) {
        return noticeRepository.findByPublishedTrue(pageable).map(noticeMapper::toNoticeListResponse);
    }

    @Override
    public Page<NoticeListResponse> getActiveNotices(Pageable pageable) {
        return noticeRepository.findActiveNotices(LocalDate.now(), pageable).map(noticeMapper::toNoticeListResponse);
    }

    @Override
    public Page<NoticeListResponse> getImportantNotices(Pageable pageable) {
        return noticeRepository.findByImportantTrue(pageable).map(noticeMapper::toNoticeListResponse);
    }

    @Override
    @Transactional
    public void deleteNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice", "id", id));
        notice.setActive(false);
        noticeRepository.save(notice);
    }

    private NoticeResponse toResponse(Notice notice) {
        NoticeResponse response = noticeMapper.toNoticeResponse(notice);
        userRepository.findById(notice.getPublishedBy()).ifPresent(user ->
                response.setAuthorName(user.getFirstName() + " " + user.getLastName()));
        return response;
    }
}
