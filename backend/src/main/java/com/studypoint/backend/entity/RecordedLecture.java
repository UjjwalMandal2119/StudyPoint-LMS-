package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recorded_lectures", indexes = {
        @Index(name = "idx_lecture_subject", columnList = "subject_id"),
        @Index(name = "idx_lecture_batch", columnList = "batch_id")
})
public class RecordedLecture extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", length = 2000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id")
    private Batch batch;

    @Column(name = "video_url", nullable = false, length = 500)
    private String videoUrl;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "uploaded_by", nullable = false)
    private Long uploadedBy;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;

    @Column(name = "view_count", nullable = false)
    private int viewCount = 0;
}