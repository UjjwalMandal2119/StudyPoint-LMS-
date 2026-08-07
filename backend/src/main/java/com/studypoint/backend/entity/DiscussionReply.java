package com.studypoint.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "discussion_replies", indexes = {
        @Index(name = "idx_reply_discussion", columnList = "discussion_id"),
        @Index(name = "idx_reply_user", columnList = "user_id")
})
public class DiscussionReply extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content", nullable = false, length = 5000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_reply_id")
    private DiscussionReply parentReply;

    @Column(name = "like_count", nullable = false)
    private int likeCount = 0;

    @Column(name = "is_accepted_answer", nullable = false)
    private boolean acceptedAnswer = false;

    @Column(name = "is_reported", nullable = false)
    private boolean reported = false;
}