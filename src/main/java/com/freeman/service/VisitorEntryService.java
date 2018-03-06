package com.freeman.service;

import com.freeman.model.VisitorEntry;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
@Service
public class VisitorEntryService {
    private List<VisitorEntry> visitors;

    public VisitorEntryService() {
        this.visitors = new ArrayList<>();
    }

    public List<VisitorEntry> getVisitors() {
        return this.visitors;
    }

    public VisitorEntry letVisitorIn(VisitorEntry entry) {
        LocalTime entranceTime = LocalTime.now();
        LocalTime exitTime = entranceTime.plusMinutes((long)(Double.parseDouble(entry.getParkingTime())*60));
        entry.setEntranceTime(LocalTime.of(entranceTime.getHour(), entranceTime.getMinute(), entranceTime.getSecond()));
        entry.setExitTime(LocalTime.of(exitTime.getHour(), exitTime.getMinute(), exitTime.getSecond()));
        entry.setElapsedTimeMinutes("0");
        this.visitors.add(entry);
        return entry;
    }
}
