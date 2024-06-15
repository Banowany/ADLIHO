package org.example.backend.services;

import org.example.backend.models.Event;
import org.example.backend.models.User;
import org.example.backend.models.UserCreateData;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Autowired
    public UserService(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }


    public User createUser(Long eventId, UserCreateData userCreateData) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new RuntimeException("Event not found");
        }
        Event event = eventOptional.get();
        User user = new User(userCreateData.getName(), event);
        return userRepository.save(user);
    }
}
