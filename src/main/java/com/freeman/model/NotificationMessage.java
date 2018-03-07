package com.freeman.model;

/**
 * Created by Dmitriy Nefedchenko on 07.03.18.
 */
public class NotificationMessage {
    private String id;
    private Long elapsedTime;
    private String status;

    public NotificationMessage() {

    }

    public NotificationMessage(String id, Long elapsedTime, String status) {
        this.id = id;
        this.elapsedTime = elapsedTime;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(Long elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "NotificationMessage{" +
                "id=" + id +
                "elapsedTime=" + elapsedTime +
                ", status='" + status + '\'' +
                '}';
    }
}
