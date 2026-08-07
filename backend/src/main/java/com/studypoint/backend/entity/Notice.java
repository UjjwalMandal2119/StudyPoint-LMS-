package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notices", indexes = {
        @Index(name = "idx_notice_date", columnList = "publish_date"),
        @Index(name = "idx_notice_importance", columnList = "is_important")
})
public class Notice extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "content", nullable = false, length = 5000)
    private String content;

    @Column(name = "publish_date", nullable = false)
    private LocalDate publishDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "is_important", nullable = false)
    private boolean important = false;

    @Column(name = "published_by", nullable = false)
    private Long publishedBy;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;

    @Column(name = "attachment_url", length = 500)
    private String attachmentUrl;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
}