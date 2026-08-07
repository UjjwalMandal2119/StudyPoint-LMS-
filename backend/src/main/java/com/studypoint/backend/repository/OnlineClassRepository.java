package com.studypoint.backend.repository;

import com.studypoint.backend.entity.OnlineClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OnlineClassRepository extends JpaRepository<OnlineClass, Long> {

    Page<OnlineClass> findByBatchId(Long batchId, Pageable pageable);

    Page<OnlineClass> findBySubjectId(Long subjectId, Pageable pageable);

    Page<OnlineClass> findByTeacherId(Long teacherId, Pageable pageable);

    @Query("SELECT c FROM OnlineClass c WHERE c.batch.id = :batchId AND c.cancelled = false AND c.startTime >= :from")
    Page<OnlineClass> findUpcomingByBatch(@Param("batchId") Long batchId, @Param("from") java.time.LocalDateTime from, Pageable pageable);
}
