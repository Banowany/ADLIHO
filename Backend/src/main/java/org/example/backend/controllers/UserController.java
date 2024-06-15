package org.example.backend.controllers;

import org.example.backend.models.Event;
import org.example.backend.models.User;
import org.example.backend.models.UserCreateData;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.UserRepository;
import org.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/events/{eventId}/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }


    @PostMapping
    public User createUser(@PathVariable Long eventId, @RequestBody UserCreateData userCreateData) {
        return userService.createUser(eventId, userCreateData);
    }
}
