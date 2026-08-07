package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByCategory(String category, Pageable pageable);

    boolean existsByIsbn(String isbn);

    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Book> search(@Param("search") String search, Pageable pageable);
}
