package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByUserId(Long userId);

    Optional<Teacher> findByEmployeeId(String employeeId);

    boolean existsByEmployeeId(String employeeId);

    List<Teacher> findByFullTimeTrue();

    @Query("SELECT t FROM Teacher t JOIN t.user u WHERE " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.employeeId) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Teacher> search(@Param("search") String search, Pageable pageable);
}