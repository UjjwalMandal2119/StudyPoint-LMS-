package com.studypoint.backend.repository;

import com.studypoint.backend.constants.AttendanceStatus;
import com.studypoint.backend.entity.Attendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByStudentIdAndAttendanceDate(Long studentId, LocalDate attendanceDate);

    List<Attendance> findByBatchIdAndAttendanceDate(Long batchId, LocalDate attendanceDate);

    Page<Attendance> findByStudentId(Long studentId, Pageable pageable);

    Page<Attendance> findByBatchId(Long batchId, Pageable pageable);

    Page<Attendance> findByBatchIdAndAttendanceDateBetween(Long batchId, LocalDate startDate, LocalDate endDate, Pageable pageable);

    long countByBatchIdAndStatus(Long batchId, AttendanceStatus status);

    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND a.attendanceDate BETWEEN :startDate AND :endDate")
    List<Attendance> findByStudentIdAndDateBetween(@Param("studentId") Long studentId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
