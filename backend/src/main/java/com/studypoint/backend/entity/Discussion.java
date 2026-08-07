package com.studypoint.backend.entity;

import com.studypoint.backend.constants.DiscussionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "discussions", indexes = {
        @Index(name = "idx_discussion_user", columnList = "user_id"),
        @Index(name = "idx_discussion_status", columnList = "status"),
        @Index(name = "idx_discussion_tag", columnList = "tag")
})
public class Discussion extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "tag", length = 50)
    private String tag;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private DiscussionStatus status = DiscussionStatus.OPEN;

    @Column(name = "like_count", nullable = false)
    private int likeCount = 0;

    @Column(name = "reply_count", nullable = false)
    private int replyCount = 0;

    @Column(name = "view_count", nullable = false)
    private int viewCount = 0;

    @Column(name = "is_pinned", nullable = false)
    private boolean pinned = false;

    @Column(name = "is_reported", nullable = false)
    private boolean reported = false;

    @Column(name = "report_reason", length = 500)
    private String reportReason;
}