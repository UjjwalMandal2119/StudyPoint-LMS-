package com.studypoint.backend.entity;

import com.studypoint.backend.constants.AssignmentStatus;
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
@Table(name = "assignments", indexes = {
        @Index(name = "idx_assignment_batch", columnList = "batch_id"),
        @Index(name = "idx_assignment_subject", columnList = "subject_id"),
        @Index(name = "idx_assignment_teacher", columnList = "teacher_id")
})
public class Assignment extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", length = 5000)
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

    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    @Column(name = "total_marks", nullable = false)
    private int totalMarks = 100;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AssignmentStatus status = AssignmentStatus.DRAFT;

    @Column(name = "is_late_submission_allowed", nullable = false)
    private boolean lateSubmissionAllowed = false;
}