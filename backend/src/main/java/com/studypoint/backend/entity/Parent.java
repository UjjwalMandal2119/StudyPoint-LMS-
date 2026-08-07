package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "parents", indexes = {
        @Index(name = "idx_parent_user", columnList = "user_id", unique = true)
})
public class Parent extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "parent_students",
            joinColumns = @JoinColumn(name = "parent_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> students = new HashSet<>();

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "annual_income", precision = 12, scale = 2)
    private java.math.BigDecimal annualIncome;

    @Column(name = "alternate_phone", length = 20)
    private String alternatePhone;

    @Column(name = "is_primary_guardian", nullable = false)
    private boolean primaryGuardian = true;
}