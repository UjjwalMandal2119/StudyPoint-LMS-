package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Page<Notice> findByPublishedTrue(Pageable pageable);

    Page<Notice> findByImportantTrue(Pageable pageable);

    @Query("SELECT n FROM Notice n WHERE n.published = true AND n.publishDate <= :date AND (n.expiryDate IS NULL OR n.expiryDate >= :date)")
    Page<Notice> findActiveNotices(@Param("date") LocalDate date, Pageable pageable);
}
