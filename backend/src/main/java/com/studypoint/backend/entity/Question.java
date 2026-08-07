package com.studypoint.backend.entity;

import com.studypoint.backend.constants.QuestionType;
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

@Getter
@Setter
@Entity
@Table(name = "questions", indexes = {
        @Index(name = "idx_question_subject", columnList = "subject_id"),
        @Index(name = "idx_question_type", columnList = "question_type")
})
public class Question extends BaseEntity {

    @Column(name = "question_text", nullable = false, length = 5000)
    private String questionText;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false, length = 20)
    private QuestionType questionType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "options", length = 5000)
    private String options;

    @Column(name = "correct_answer", length = 2000)
    private String correctAnswer;

    @Column(name = "explanation", length = 5000)
    private String explanation;

    @Column(name = "marks", nullable = false)
    private int marks = 1;

    @Column(name = "difficulty_level", length = 20)
    private String difficultyLevel;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "is_approved", nullable = false)
    private boolean approved = false;
}