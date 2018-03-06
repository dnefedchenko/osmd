package com.freeman.service;

import com.freeman.model.VisitorEntry;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
@Service
public class VisitorEntryService {
    private DateTimeFormatter formatter;
    private List<VisitorEntry> visitors;

    public VisitorEntryService() {
        this.visitors = new ArrayList<>();
        this.formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    }

    public List<VisitorEntry> getVisitors() {
        return this.visitors;
    }

    public VisitorEntry letVisitorIn(VisitorEntry entry) {
        LocalTime entranceTime = LocalTime.now();
        entry.setEntranceTime(LocalTime.of(entranceTime.getHour(), entranceTime.getMinute(), entranceTime.getSecond()));
        this.visitors.add(entry);
        return entry;
    }
}
