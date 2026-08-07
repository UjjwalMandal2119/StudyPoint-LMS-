package com.studypoint.backend.repository;

import com.studypoint.backend.entity.ActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    Page<ActivityLog> findByUserId(Long userId, Pageable pageable);

    Page<ActivityLog> findByAction(String action, Pageable pageable);

    @Query("SELECT a FROM ActivityLog a WHERE a.userId = :userId AND a.timestamp >= :fromDate")
    Page<ActivityLog> findByUserIdAndTimestampAfter(@Param("userId") Long userId, @Param("fromDate") java.time.LocalDateTime fromDate, Pageable pageable);
}
