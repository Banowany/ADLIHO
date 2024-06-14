package org.example.backend.controllers;

import org.example.backend.models.Event;
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
    public Event createEvent(@RequestBody String eventName) {
        Event event = new Event(eventName);
        return eventRepository.save(event);
    }

    @PutMapping("/{id}/users")
    public Event addUserToEvent(@PathVariable Long id, @RequestBody String userName) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isEmpty()) {
            throw new RuntimeException("Event not found");
        }
        Event event = eventOptional.get();
        User user = new User(userName, event);
        userRepository.save(user);
        event.getUsers().add(user);
        return eventRepository.save(event);
    }
}
