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

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "online_classes", indexes = {
        @Index(name = "idx_class_batch", columnList = "batch_id"),
        @Index(name = "idx_class_subject", columnList = "subject_id"),
        @Index(name = "idx_class_start", columnList = "start_time")
})
public class OnlineClass extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", length = 2000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "meeting_link", length = 500)
    private String meetingLink;

    @Column(name = "meeting_password", length = 100)
    private String meetingPassword;

    @Column(name = "recording_url", length = 500)
    private String recordingUrl;

    @Column(name = "is_recurring", nullable = false)
    private boolean recurring = false;

    @Column(name = "recurrence_pattern", length = 50)
    private String recurrencePattern;

    @Column(name = "is_cancelled", nullable = false)
    private boolean cancelled = false;

    @Column(name = "cancel_reason", length = 500)
    private String cancelReason;
}