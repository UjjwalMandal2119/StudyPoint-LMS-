package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "results", indexes = {
        @Index(name = "idx_result_exam", columnList = "exam_id"),
        @Index(name = "idx_result_student", columnList = "student_id")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uk_result_exam_student", columnNames = {"exam_id", "student_id"})
})
public class Result extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "marks_obtained", nullable = false)
    private int marksObtained;

    @Column(name = "percentage", nullable = false)
    private double percentage;

    @Column(name = "grade", length = 5)
    private String grade;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "is_passed", nullable = false)
    private boolean passed;

    @Column(name = "remarks", length = 1000)
    private String remarks;

    @Column(name = "published_by")
    private Long publishedBy;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
}