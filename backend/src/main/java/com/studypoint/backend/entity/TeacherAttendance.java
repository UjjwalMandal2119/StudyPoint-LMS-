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
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "teacher_attendance", indexes = {
        @Index(name = "idx_teacher_att_teacher", columnList = "teacher_id"),
        @Index(name = "idx_teacher_att_date", columnList = "attendance_date")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uk_teacher_att_date", columnNames = {"teacher_id", "attendance_date"})
})
public class TeacherAttendance extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AttendanceStatus status;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime;

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @Column(name = "marked_by")
    private Long markedBy;

    @Column(name = "remarks", length = 500)
    private String remarks;
}