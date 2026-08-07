package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Page<Event> findByPublishedTrue(Pageable pageable);

    @Query("SELECT e FROM Event e WHERE e.published = true AND e.startTime >= :fromDate")
    Page<Event> findUpcoming(@Param("fromDate") LocalDateTime fromDate, Pageable pageable);

    Page<Event> findByEventType(String eventType, Pageable pageable);
}
