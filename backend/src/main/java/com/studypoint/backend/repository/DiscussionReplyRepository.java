package com.studypoint.backend.repository;

import com.studypoint.backend.entity.DiscussionReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionReplyRepository extends JpaRepository<DiscussionReply, Long> {

    Page<DiscussionReply> findByDiscussionId(Long discussionId, Pageable pageable);

    Page<DiscussionReply> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT r FROM DiscussionReply r WHERE r.discussion.id = :discussionId AND r.parentReply IS NULL")
    Page<DiscussionReply> findTopLevelReplies(@Param("discussionId") Long discussionId, Pageable pageable);
}
