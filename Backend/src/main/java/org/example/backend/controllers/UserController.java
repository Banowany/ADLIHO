package org.example.backend.controllers;

import org.example.backend.models.Event;
import org.example.backend.models.User;
import org.example.backend.models.UserCreateData;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/events/{eventId}/users")
public class UserController {
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Autowired
    public UserController(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }


    @PostMapping
    public User createUser(@PathVariable Long eventId, @RequestBody UserCreateData userCreateData) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new RuntimeException("Event not found");
        }
        Event event = eventOptional.get();
        User user = new User(userCreateData.getName(), event);
        return userRepository.save(user);
    }
}
