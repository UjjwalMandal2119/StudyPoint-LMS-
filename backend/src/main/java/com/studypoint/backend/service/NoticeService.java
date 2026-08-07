package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.NoticeRequest;
import com.studypoint.backend.dto.response.NoticeListResponse;
import com.studypoint.backend.dto.response.NoticeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {

    NoticeResponse createNotice(NoticeRequest request, Long publishedBy);

    NoticeResponse updateNotice(Long id, NoticeRequest request);

    NoticeResponse publishNotice(Long id, Long publishedBy);

    NoticeResponse unpublishNotice(Long id);

    NoticeResponse getNoticeById(Long id);

    Page<NoticeListResponse> getAllNotices(Pageable pageable);

    Page<NoticeListResponse> getPublishedNotices(Pageable pageable);

    Page<NoticeListResponse> getActiveNotices(Pageable pageable);

    Page<NoticeListResponse> getImportantNotices(Pageable pageable);

    void deleteNotice(Long id);
}
