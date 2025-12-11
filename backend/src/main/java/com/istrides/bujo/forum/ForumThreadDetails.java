package com.istrides.bujo.forum;

import java.util.List;

public class ForumThreadDetails {

    private ForumThread thread;
    private List<ForumReply> replies;

    public ForumThreadDetails(ForumThread thread, List<ForumReply> replies) {
        this.thread = thread;
        this.replies = replies;
    }

    public ForumThread getThread() {
        return thread;
    }

    public void setThread(ForumThread thread) {
        this.thread = thread;
    }

    public List<ForumReply> getReplies() {
        return replies;
    }

    public void setReplies(List<ForumReply> replies) {
        this.replies = replies;
    }
}
