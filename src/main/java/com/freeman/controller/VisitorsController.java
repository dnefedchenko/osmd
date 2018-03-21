package com.freeman.controller;

import com.freeman.model.VisitorEntry;
import com.freeman.service.VisitorEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by freeman on 21.02.18.
 */
@RestController
@RequestMapping(value = "/visitors")
public class VisitorsController {
    private VisitorEntryService visitorEntryService;

    @Autowired
    public VisitorsController(VisitorEntryService visitorEntryService) {
        this.visitorEntryService = visitorEntryService;
    }

    @PostMapping
    public VisitorEntry letVisitorIn(VisitorEntry entry) {
        return visitorEntryService.letVisitorIn(entry);
    }

    @PostMapping(value = "/{vrn}")
    public String letVisitorOut(@PathVariable String vrn) {
        return visitorEntryService.letVisitorOut(vrn);
    }
}
