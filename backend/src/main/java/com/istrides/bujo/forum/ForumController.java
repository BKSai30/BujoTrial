package com.istrides.bujo.forum;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "http://localhost:5173")
public class ForumController {

    private final ForumThreadRepository threadRepository;
    private final ForumReplyRepository replyRepository;

    public ForumController(ForumThreadRepository threadRepository, ForumReplyRepository replyRepository) {
        this.threadRepository = threadRepository;
        this.replyRepository = replyRepository;
    }

    @GetMapping("/threads")
    public List<ForumThread> getThreads() {
        return threadRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping("/threads")
    public ForumThread createThread(@RequestBody ForumThreadCreateRequest request) {
        ForumThread thread = new ForumThread();
        thread.setTitle(request.getTitle());
        thread.setContent(request.getContent());
        thread.setAuthorName(request.getAuthorName());
        thread.setCreatedAt(LocalDateTime.now());
        return threadRepository.save(thread);
    }

    @GetMapping("/threads/{id}")
    public ForumThreadDetails getThreadDetails(@PathVariable Long id) {
        ForumThread thread = threadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thread not found"));
        List<ForumReply> replies = replyRepository.findByThreadIdOrderByCreatedAtAsc(id);
        return new ForumThreadDetails(thread, replies);
    }

    @PostMapping("/threads/{id}/replies")
    public ForumReply createReply(@PathVariable Long id, @RequestBody ForumReplyCreateRequest request) {
        ForumThread thread = threadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thread not found"));
        ForumReply reply = new ForumReply();
        reply.setThread(thread);
        reply.setContent(request.getContent());
        reply.setAuthorName(request.getAuthorName());
        reply.setCreatedAt(LocalDateTime.now());
        return replyRepository.save(reply);
    }
}
