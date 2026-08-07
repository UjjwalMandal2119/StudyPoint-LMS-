package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    Optional<Subject> findByCode(String code);

    boolean existsByCode(String code);

    boolean existsByCodeAndIdNot(String code, Long id);

    List<Subject> findByCourseId(Long courseId);

    Page<Subject> findByCourseId(Long courseId, Pageable pageable);

    List<Subject> findByTeacherId(Long teacherId);

    @Query("SELECT s FROM Subject s WHERE " +
           "(LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.code) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Subject> search(@Param("search") String search, Pageable pageable);
}