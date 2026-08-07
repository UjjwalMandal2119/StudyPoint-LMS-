package com.studypoint.backend.repository;

import com.studypoint.backend.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findBySenderId(Long senderId, Pageable pageable);

    Page<Message> findByReceiverId(Long receiverId, Pageable pageable);

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :senderId AND m.receiver.id = :receiverId) OR (m.sender.id = :receiverId AND m.receiver.id = :senderId)")
    Page<Message> findConversation(@Param("senderId") Long senderId, @Param("receiverId") Long receiverId, Pageable pageable);

    long countByReceiverIdAndReadFalse(Long receiverId);
}
