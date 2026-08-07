package com.studypoint.backend.entity;

import com.studypoint.backend.constants.AttendanceStatus;
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

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "attendance", indexes = {
        @Index(name = "idx_attendance_student", columnList = "student_id"),
        @Index(name = "idx_attendance_batch", columnList = "batch_id"),
        @Index(name = "idx_attendance_date", columnList = "attendance_date")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uk_attendance_student_date", columnNames = {"student_id", "attendance_date"})
})
public class Attendance extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AttendanceStatus status;

    @Column(name = "marked_by")
    private Long markedBy;

    @Column(name = "remarks", length = 500)
    private String remarks;
}