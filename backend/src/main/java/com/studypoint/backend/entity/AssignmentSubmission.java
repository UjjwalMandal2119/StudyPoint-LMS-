package com.studypoint.backend.entity;

import com.studypoint.backend.constants.SubmissionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "assignment_submissions", indexes = {
        @Index(name = "idx_submission_assignment", columnList = "assignment_id"),
        @Index(name = "idx_submission_student", columnList = "student_id")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uk_submission_assign_student", columnNames = {"assignment_id", "student_id"})
})
public class AssignmentSubmission extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "submission_text", length = 5000)
    private String submissionText;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private SubmissionStatus status = SubmissionStatus.SUBMITTED;

    @Column(name = "marks_obtained")
    private Integer marksObtained;

    @Column(name = "feedback", length = 2000)
    private String feedback;

    @Column(name = "graded_by")
    private Long gradedBy;

    @Column(name = "graded_at")
    private LocalDateTime gradedAt;
}