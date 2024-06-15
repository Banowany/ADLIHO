package org.example.backend.controllers;

import org.example.backend.models.Event;
import org.example.backend.models.EventCreateData;
import org.example.backend.models.User;
import org.example.backend.repositories.UserRepository;
import org.example.backend.services.EventService;
import org.example.backend.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;
    private final ReportService reportService;

    @Autowired
    public EventController(EventService eventService, ReportService reportService) {
        this.eventService = eventService;
        this.reportService = reportService;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.getEvents();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }

    @PostMapping
    public Event createEvent(@RequestBody EventCreateData eventCreateData) {
        return eventService.createEvent(eventCreateData.getName());
    }

    @GetMapping("/{id}/report")
    public Map<String, Map<String, Double>> getReport(@PathVariable Long id) {
        return reportService.generateReport(id);
    }

}
