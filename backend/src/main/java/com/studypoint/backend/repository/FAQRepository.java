package com.studypoint.backend.repository;

import com.studypoint.backend.entity.FAQ;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {

    Page<FAQ> findByCategory(String category, Pageable pageable);

    Page<FAQ> findByPublishedTrue(Pageable pageable);
}
