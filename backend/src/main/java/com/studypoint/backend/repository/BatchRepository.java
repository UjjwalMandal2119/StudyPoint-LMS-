package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Batch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    Optional<Batch> findByCode(String code);

        boolean existsByCode(String code);

    boolean existsByCodeAndIdNot(String code, Long id);

    List<Batch> findByCourseId(Long courseId);

    Page<Batch> findByCourseId(Long courseId, Pageable pageable);

    List<Batch> findByTeacherId(Long teacherId);

    List<Batch> findByActiveTrue();

    @Query("SELECT b FROM Batch b WHERE " +
           "(LOWER(b.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.code) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Batch> search(@Param("search") String search, Pageable pageable);

    long countByCourseId(Long courseId);
}