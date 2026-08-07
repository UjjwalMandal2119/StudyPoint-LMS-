package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "gallery", indexes = {
        @Index(name = "idx_gallery_category", columnList = "category")
})
public class Gallery extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", length = 2000)
    private String description;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "is_published", nullable = false)
    private boolean published = false;

    @Column(name = "uploaded_by", nullable = false)
    private Long uploadedBy;
}