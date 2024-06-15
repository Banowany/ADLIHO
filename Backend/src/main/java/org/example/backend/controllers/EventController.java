package org.example.backend.controllers;

import org.example.backend.models.Event;
import org.example.backend.models.EventCreateData;
import org.example.backend.models.User;
import org.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final org.example.backend.repositories.EventRepository eventRepository;
    private final UserRepository userRepository;

    @Autowired
    public EventController(org.example.backend.repositories.EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @PostMapping
    public Event createEvent(@RequestBody EventCreateData eventCreateData) {
        Event event = new Event(eventCreateData.getName());
        return eventRepository.save(event);
    }
}
