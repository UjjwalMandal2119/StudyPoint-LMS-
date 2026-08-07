package com.studypoint.backend.entity;

import com.studypoint.backend.constants.BookStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "books", indexes = {
        @Index(name = "idx_book_title", columnList = "title"),
        @Index(name = "idx_book_isbn", columnList = "isbn", unique = true),
        @Index(name = "idx_book_status", columnList = "status")
})
public class Book extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "author", nullable = false, length = 100)
    private String author;

    @Column(name = "isbn", unique = true, length = 20)
    private String isbn;

    @Column(name = "publisher", length = 100)
    private String publisher;

    @Column(name = "publication_year")
    private Integer publicationYear;

    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "shelf_location", length = 50)
    private String shelfLocation;

    @Column(name = "total_copies", nullable = false)
    private int totalCopies = 1;

    @Column(name = "available_copies", nullable = false)
    private int availableCopies = 1;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private BookStatus status = BookStatus.AVAILABLE;

    @Column(name = "description", length = 2000)
    private String description;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;
}