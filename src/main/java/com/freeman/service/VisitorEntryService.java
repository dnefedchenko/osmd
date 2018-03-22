package com.freeman.service;

import com.freeman.model.VisitorEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
        LocalDateTime entranceTime = LocalDateTime.ofInstant(Instant.now(), ZoneId.of("Europe/Kiev"));
        LocalDateTime exitTime = entranceTime.plusMinutes((long)(Double.parseDouble(entry.getParkingTime())*60));
        entry.setEntranceTime(DateTimeFormatter.ISO_DATE_TIME.format(entranceTime));
        entry.setExitTime(DateTimeFormatter.ISO_DATE_TIME.format(exitTime));
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

    public static void main(String[] args) {
        LocalDateTime dateTime = LocalDateTime.ofInstant(Instant.now(), ZoneId.of("Europe/Kiev"));
        String isoDateTime = DateTimeFormatter.ISO_DATE_TIME.format(dateTime);
        System.out.println(isoDateTime);
    }
}
