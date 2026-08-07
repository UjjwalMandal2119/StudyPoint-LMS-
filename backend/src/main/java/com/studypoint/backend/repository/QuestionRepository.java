package com.studypoint.backend.repository;

import com.studypoint.backend.constants.QuestionType;
import com.studypoint.backend.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    Page<Question> findBySubjectId(Long subjectId, Pageable pageable);

    Page<Question> findByQuestionType(QuestionType questionType, Pageable pageable);

    Page<Question> findByCreatedBy(Long createdBy, Pageable pageable);

    @Query("SELECT q FROM Question q WHERE q.subject.id = :subjectId AND q.approved = true")
    Page<Question> findApprovedBySubjectId(@Param("subjectId") Long subjectId, Pageable pageable);
}
