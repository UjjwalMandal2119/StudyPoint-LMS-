package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.NoticeRequest;
import com.studypoint.backend.dto.response.NoticeListResponse;
import com.studypoint.backend.dto.response.NoticeResponse;
import com.studypoint.backend.entity.Notice;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class NoticeMapperImpl implements NoticeMapper {

    @Override
    public Notice toNotice(NoticeRequest request) {
        if ( request == null ) {
            return null;
        }

        Notice notice = new Notice();

        notice.setAttachmentUrl( request.getAttachmentUrl() );
        notice.setContent( request.getContent() );
        notice.setExpiryDate( request.getExpiryDate() );
        notice.setImportant( request.isImportant() );
        notice.setPublishDate( request.getPublishDate() );
        notice.setTitle( request.getTitle() );

        return notice;
    }

    @Override
    public NoticeResponse toNoticeResponse(Notice notice) {
        if ( notice == null ) {
            return null;
        }

        String attachmentUrl = null;
        String content = null;
        LocalDateTime createdAt = null;
        LocalDate expiryDate = null;
        Long id = null;
        boolean important = false;
        LocalDate publishDate = null;
        boolean published = false;
        LocalDateTime publishedAt = null;
        Long publishedBy = null;
        String title = null;
        LocalDateTime updatedAt = null;

        attachmentUrl = notice.getAttachmentUrl();
        content = notice.getContent();
        createdAt = notice.getCreatedAt();
        expiryDate = notice.getExpiryDate();
        id = notice.getId();
        important = notice.isImportant();
        publishDate = notice.getPublishDate();
        published = notice.isPublished();
        publishedAt = notice.getPublishedAt();
        publishedBy = notice.getPublishedBy();
        title = notice.getTitle();
        updatedAt = notice.getUpdatedAt();

        String authorName = null;

        NoticeResponse noticeResponse = new NoticeResponse( id, title, content, publishDate, expiryDate, important, publishedBy, authorName, published, attachmentUrl, publishedAt, createdAt, updatedAt );

        return noticeResponse;
    }

    @Override
    public NoticeListResponse toNoticeListResponse(Notice notice) {
        if ( notice == null ) {
            return null;
        }

        LocalDateTime createdAt = null;
        LocalDate expiryDate = null;
        Long id = null;
        boolean important = false;
        LocalDate publishDate = null;
        boolean published = false;
        String title = null;

        createdAt = notice.getCreatedAt();
        expiryDate = notice.getExpiryDate();
        id = notice.getId();
        important = notice.isImportant();
        publishDate = notice.getPublishDate();
        published = notice.isPublished();
        title = notice.getTitle();

        NoticeListResponse noticeListResponse = new NoticeListResponse( id, title, publishDate, expiryDate, important, published, createdAt );

        return noticeListResponse;
    }

    @Override
    public void updateNotice(NoticeRequest request, Notice notice) {
        if ( request == null ) {
            return;
        }

        notice.setTitle( request.getTitle() );
        notice.setContent( request.getContent() );
        notice.setPublishDate( request.getPublishDate() );
        notice.setExpiryDate( request.getExpiryDate() );
        notice.setImportant( request.isImportant() );
        notice.setAttachmentUrl( request.getAttachmentUrl() );
    }
}
