package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCode(String code);

        boolean existsByCode(String code);

    boolean existsByCodeAndIdNot(String code, Long id);

    List<Course> findByPublishedTrue();

    Page<Course> findByPublishedTrue(Pageable pageable);

    @Query("SELECT c FROM Course c WHERE " +
           "(LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.code) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Course> search(@Param("search") String search, Pageable pageable);
}