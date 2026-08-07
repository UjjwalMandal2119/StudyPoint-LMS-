package com.studypoint.backend.repository;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.entity.AdmissionApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmissionApplicationRepository extends JpaRepository<AdmissionApplication, Long> {

    Page<AdmissionApplication> findByStatus(EnrollmentStatus status, Pageable pageable);

    @Query("SELECT a FROM AdmissionApplication a WHERE LOWER(a.email) = LOWER(:email)")
    Page<AdmissionApplication> findByEmail(@Param("email") String email, Pageable pageable);

    boolean existsByEmailAndCourseId(String email, Long courseId);
}
