package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "courses", indexes = {
        @Index(name = "idx_course_name", columnList = "name"),
        @Index(name = "idx_course_code", columnList = "code", unique = true)
})
public class Course extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "code", nullable = false, unique = true, length = 20)
    private String code;

    @Column(name = "description", length = 2000)
    private String description;

    @Column(name = "duration_months", nullable = false)
    private int durationMonths;

    @Column(name = "fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal fee;

    @Column(name = "discount_fee", precision = 10, scale = 2)
    private BigDecimal discountFee;

    @Column(name = "max_students")
    private Integer maxStudents;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;

    @Column(name = "syllabus", length = 5000)
    private String syllabus;
}