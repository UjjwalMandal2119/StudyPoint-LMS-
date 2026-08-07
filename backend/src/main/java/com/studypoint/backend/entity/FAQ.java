package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "faqs", indexes = {
        @Index(name = "idx_faq_category", columnList = "category")
})
public class FAQ extends BaseEntity {

    @Column(name = "question", nullable = false, length = 500)
    private String question;

    @Column(name = "answer", nullable = false, length = 5000)
    private String answer;

    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder = 0;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;
}