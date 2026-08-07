package com.studypoint.backend.repository;

import com.studypoint.backend.constants.AttendanceStatus;
import com.studypoint.backend.entity.TeacherAttendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface TeacherAttendanceRepository extends JpaRepository<TeacherAttendance, Long> {

    Optional<TeacherAttendance> findByTeacherIdAndAttendanceDate(Long teacherId, LocalDate attendanceDate);

    Page<TeacherAttendance> findByTeacherId(Long teacherId, Pageable pageable);

    Page<TeacherAttendance> findByTeacherIdAndAttendanceDateBetween(Long teacherId, LocalDate startDate, LocalDate endDate, Pageable pageable);

    long countByTeacherIdAndStatus(Long teacherId, AttendanceStatus status);
}
