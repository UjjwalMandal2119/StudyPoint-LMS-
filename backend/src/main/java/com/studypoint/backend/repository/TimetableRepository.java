package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Timetable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {

    Page<Timetable> findByBatchId(Long batchId, Pageable pageable);

    Page<Timetable> findBySubjectId(Long subjectId, Pageable pageable);

    Page<Timetable> findByTeacherId(Long teacherId, Pageable pageable);

    Page<Timetable> findByBatchIdAndDayOfWeek(Long batchId, DayOfWeek dayOfWeek, Pageable pageable);

    @Query("SELECT t FROM Timetable t WHERE t.batch.id = :batchId AND t.dayOfWeek = :dayOfWeek AND t.active = true")
    Page<Timetable> findActiveByBatchAndDay(@Param("batchId") Long batchId, @Param("dayOfWeek") DayOfWeek dayOfWeek, Pageable pageable);
}
