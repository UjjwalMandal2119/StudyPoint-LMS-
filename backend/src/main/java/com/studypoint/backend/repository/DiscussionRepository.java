package com.studypoint.backend.repository;

import com.studypoint.backend.constants.DiscussionStatus;
import com.studypoint.backend.entity.Discussion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    Page<Discussion> findByUserId(Long userId, Pageable pageable);

    Page<Discussion> findByStatus(DiscussionStatus status, Pageable pageable);

    Page<Discussion> findByTag(String tag, Pageable pageable);

    @Query("SELECT d FROM Discussion d WHERE LOWER(d.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.content) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Discussion> search(@Param("search") String search, Pageable pageable);

    Page<Discussion> findByPinnedTrue(Pageable pageable);
}
