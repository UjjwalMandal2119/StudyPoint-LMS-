package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    Page<Gallery> findByCategory(String category, Pageable pageable);

    Page<Gallery> findByPublishedTrue(Pageable pageable);
}
