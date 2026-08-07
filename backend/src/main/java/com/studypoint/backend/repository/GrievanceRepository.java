package com.studypoint.backend.repository;

import com.studypoint.backend.constants.GrievanceStatus;
import com.studypoint.backend.entity.Grievance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {

    Optional<Grievance> findByTrackingNumber(String trackingNumber);

    Page<Grievance> findByUserId(Long userId, Pageable pageable);

    Page<Grievance> findByStatus(GrievanceStatus status, Pageable pageable);

    Page<Grievance> findByCategory(String category, Pageable pageable);

    boolean existsByTrackingNumber(String trackingNumber);

    @Query("SELECT g FROM Grievance g WHERE LOWER(g.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(g.trackingNumber) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Grievance> search(@Param("search") String search, Pageable pageable);
}
