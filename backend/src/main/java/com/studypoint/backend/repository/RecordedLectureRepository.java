package com.studypoint.backend.repository;

import com.studypoint.backend.entity.RecordedLecture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordedLectureRepository extends JpaRepository<RecordedLecture, Long> {

    Page<RecordedLecture> findBySubjectId(Long subjectId, Pageable pageable);

    Page<RecordedLecture> findByBatchId(Long batchId, Pageable pageable);

    Page<RecordedLecture> findByPublishedTrue(Pageable pageable);

    @Query("SELECT r FROM RecordedLecture r WHERE r.batch.id = :batchId AND r.subject.id = :subjectId")
    Page<RecordedLecture> findByBatchIdAndSubjectId(@Param("batchId") Long batchId, @Param("subjectId") Long subjectId, Pageable pageable);
}
