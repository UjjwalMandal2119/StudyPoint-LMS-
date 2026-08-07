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

@Getter
@Setter
@Entity
@Table(name = "chatbot_conversations", indexes = {
        @Index(name = "idx_chatbot_user", columnList = "user_id"),
        @Index(name = "idx_chatbot_created", columnList = "created_at")
})
public class ChatbotConversation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "session_id", nullable = false, length = 100)
    private String sessionId;

    @Column(name = "user_message", nullable = false, length = 5000)
    private String userMessage;

    @Column(name = "bot_response", nullable = false, length = 10000)
    private String botResponse;

    @Column(name = "intent", length = 50)
    private String intent;

    @Column(name = "is_resolved", nullable = false)
    private boolean resolved = false;
}