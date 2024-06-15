package org.example.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity(name = "EventTable")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users;

    public Event() {
    }

    public Event(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public double getTotalExpenses() {
        return users.stream().mapToDouble(user -> user.getExpenses().stream().mapToDouble(Expense::getAmount).sum()).sum();
    }
}
