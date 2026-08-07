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

@Getter
@Setter
@Entity
@Table(name = "book_issues", indexes = {
        @Index(name = "idx_book_issue_book", columnList = "book_id"),
        @Index(name = "idx_book_issue_student", columnList = "student_id"),
        @Index(name = "idx_book_issue_due", columnList = "due_date")
})
public class BookIssue extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "is_returned", nullable = false)
    private boolean returned = false;

    @Column(name = "fine_amount", precision = 10, scale = 2)
    private java.math.BigDecimal fineAmount;

    @Column(name = "issued_by")
    private Long issuedBy;

    @Column(name = "remarks", length = 500)
    private String remarks;
}