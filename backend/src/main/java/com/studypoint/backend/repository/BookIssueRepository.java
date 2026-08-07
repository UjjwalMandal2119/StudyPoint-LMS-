package com.studypoint.backend.repository;

import com.studypoint.backend.entity.BookIssue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookIssueRepository extends JpaRepository<BookIssue, Long> {

    Page<BookIssue> findByBookId(Long bookId, Pageable pageable);

    Page<BookIssue> findByStudentId(Long studentId, Pageable pageable);

    List<BookIssue> findByBookIdAndReturnedFalse(Long bookId);

    List<BookIssue> findByStudentIdAndReturnedFalse(Long studentId);

    @Query("SELECT b FROM BookIssue b WHERE b.returned = false AND b.dueDate < :date")
    List<BookIssue> findOverdueBooks(@Param("date") LocalDate date);
}
