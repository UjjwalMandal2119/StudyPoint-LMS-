package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "events", indexes = {
        @Index(name = "idx_event_start", columnList = "start_time"),
        @Index(name = "idx_event_type", columnList = "event_type")
})
public class Event extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", length = 5000)
    private String description;

    @Column(name = "event_type", nullable = false, length = 50)
    private String eventType;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;

    @Column(name = "is_online", nullable = false)
    private boolean online = false;

    @Column(name = "meeting_link", length = 500)
    private String meetingLink;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;
}