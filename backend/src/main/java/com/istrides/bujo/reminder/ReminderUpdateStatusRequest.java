package com.istrides.bujo.reminder;

public class ReminderUpdateStatusRequest {

    private boolean completed;

    public ReminderUpdateStatusRequest() {
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
