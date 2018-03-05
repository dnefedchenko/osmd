package com.freeman.controller;

import com.freeman.model.TimeRange;
import com.freeman.model.VisitorEntry;
import com.freeman.service.VisitorEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by freeman on 21.02.18.
 */
@Controller
@RequestMapping(value = "/visitors")
public class VisitorsController {
    private String VISITORS_VIEW = "visitors";

    private VisitorEntryService visitorEntryService;

    @Autowired
    public VisitorsController(VisitorEntryService visitorEntryService) {
        this.visitorEntryService = visitorEntryService;
    }

    @ModelAttribute("timeRangeOptions")
    public List<String> timeRangeOptions() {
        return TimeRange.getAllOptions();
    }

    @ModelAttribute("visitor")
    public VisitorEntry visitorEntry() {
        return new VisitorEntry("", "", null, "");
    }

    @ModelAttribute("visitors")
    public List<VisitorEntry> visitors() {
        return this.visitorEntryService.getVisitors();
    }

    @GetMapping
    public String showVisitorsPage(Model model) {
        /*model.addAttribute("timeRangeOptions", TimeRange.getAllOptions());
        model.addAttribute("visitorEntry", new VisitorEntry("", "", null, ""));
        model.addAttribute("visitors", this.visitorEntryService.getVisitors());*/
        return VISITORS_VIEW;
    }

    @PostMapping
    public String letVisitorIn(Model model, VisitorEntry entry, BindingResult bindingResult) {
        VisitorEntry visitor = visitorEntryService.letVisitorIn(entry);
        /*model.addAttribute("timeRangeOptions", TimeRange.getAllOptions());
        model.addAttribute("visitorEntry", new VisitorEntry("", "", null, ""));
        model.addAttribute("visitors", this.visitorEntryService.getVisitors());*/
        return VISITORS_VIEW;
    }
}