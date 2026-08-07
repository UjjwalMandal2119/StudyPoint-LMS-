package com.studypoint.backend.entity;

import com.studypoint.backend.constants.GrievanceStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "grievances", indexes = {
        @Index(name = "idx_grievance_tracking", columnList = "tracking_number", unique = true),
        @Index(name = "idx_grievance_user", columnList = "user_id"),
        @Index(name = "idx_grievance_status", columnList = "status")
})
public class Grievance extends BaseEntity {

    @Column(name = "tracking_number", nullable = false, unique = true, length = 30)
    private String trackingNumber;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", nullable = false, length = 5000)
    private String description;

    @Column(name = "category", length = 50)
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private GrievanceStatus status = GrievanceStatus.SUBMITTED;

    @Column(name = "admin_response", length = 5000)
    private String adminResponse;

    @Column(name = "resolved_by")
    private Long resolvedBy;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
}
