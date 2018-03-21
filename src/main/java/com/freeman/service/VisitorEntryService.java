package com.freeman.service;

import com.freeman.model.VisitorEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
@Service
public class VisitorEntryService {
    private List<VisitorEntry> visitors;
    private SimpMessagingTemplate messagingTemplate;
    private Map<String, ParkingTimeTask> tasksBeingTracked;

    @Autowired
    public VisitorEntryService(SimpMessagingTemplate messagingTemplate) {
        this.visitors = new ArrayList<>();
        this.messagingTemplate = messagingTemplate;
        this.tasksBeingTracked = new HashMap<>();
    }

    public VisitorEntry letVisitorIn(VisitorEntry entry) {
        LocalTime entranceTime = LocalTime.now();
        LocalTime exitTime = entranceTime.plusMinutes((long)(Double.parseDouble(entry.getParkingTime())*60));
        entry.setEntranceTime(String.format("%s:%s:%s", entranceTime.getHour(), entranceTime.getMinute(), entranceTime.getSecond()));
        entry.setExitTime(String.format("%s:%s:%s", exitTime.getHour(), exitTime.getMinute(), exitTime.getSecond()));
        entry.setElapsedTimeMinutes("0");
        this.visitors.add(entry);
        startTimeTracking(entry);
        return entry;
    }

    private void startTimeTracking(VisitorEntry visitor) {
        ParkingTimeTask task = new ParkingTimeTask(visitor, messagingTemplate);
        task.startTimeTracking();
        this.tasksBeingTracked.put(task.getId(), task);
    }

    public String letVisitorOut(String vrn) {
        ParkingTimeTask task = this.tasksBeingTracked.remove(vrn);
        task.complete();
        return vrn;
    }
}
