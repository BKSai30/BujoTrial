package com.istrides.bujo.forum;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForumReplyRepository extends JpaRepository<ForumReply, Long> {

    List<ForumReply> findByThreadIdOrderByCreatedAtAsc(Long threadId);
}
