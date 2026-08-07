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

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "batches", indexes = {
        @Index(name = "idx_batch_name", columnList = "name"),
        @Index(name = "idx_batch_course", columnList = "course_id")
})
public class Batch extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "code", nullable = false, unique = true, length = 20)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "class_time")
    private LocalTime classTime;

    @Column(name = "class_days", length = 100)
    private String classDays;

    @Column(name = "room_number", length = 20)
    private String roomNumber;

    @Column(name = "max_students")
    private Integer maxStudents;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;
}