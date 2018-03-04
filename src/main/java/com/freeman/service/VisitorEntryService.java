package com.freeman.service;

import com.freeman.model.VisitorEntry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
@Service
public class VisitorEntryService {
    private List<VisitorEntry> visitors;

    public VisitorEntryService() {
        this.visitors = new ArrayList<>();
        /*this.visitors.add(new VisitorEntry("1", "AI0640BO", LocalTime.of(12, 40), "24:13"));
        this.visitors.add(new VisitorEntry("2", "AI5031BO", LocalTime.of(13, 00), "14:00"));
        this.visitors.add(new VisitorEntry("3", "BH0640CE", LocalTime.of(14, 30), "17:15"));*/
    }

    public List<VisitorEntry> getVisitors() {
        return this.visitors;
    }

    public VisitorEntry letVisitorIn(VisitorEntry entry) {
        IntStream stream = IntStream.generate(() -> (int)Math.random()*150);
        entry.setId(stream.limit(1).iterator().next().toString());
        this.visitors.add(entry);
        return entry;
    }
}
