package com.studypoint.backend.repository;

import com.studypoint.backend.entity.ChatbotConversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatbotConversationRepository extends JpaRepository<ChatbotConversation, Long> {

    Page<ChatbotConversation> findByUserId(Long userId, Pageable pageable);

    Page<ChatbotConversation> findBySessionId(String sessionId, Pageable pageable);

    @Query("SELECT c FROM ChatbotConversation c WHERE c.user.id = :userId AND c.resolved = false")
    Page<ChatbotConversation> findUnresolvedByUserId(@Param("userId") Long userId, Pageable pageable);
}
