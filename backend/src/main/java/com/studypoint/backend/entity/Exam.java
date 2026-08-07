package com.studypoint.backend.entity;

import com.studypoint.backend.constants.ExamType;
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
@Table(name = "exams", indexes = {
        @Index(name = "idx_exam_batch", columnList = "batch_id"),
        @Index(name = "idx_exam_subject", columnList = "subject_id"),
        @Index(name = "idx_exam_type", columnList = "exam_type")
})
public class Exam extends BaseEntity {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "exam_type", nullable = false, length = 20)
    private ExamType examType;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "total_marks", nullable = false)
    private int totalMarks = 100;

    @Column(name = "pass_marks", nullable = false)
    private int passMarks = 40;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;

    @Column(name = "instructions", length = 5000)
    private String instructions;
}