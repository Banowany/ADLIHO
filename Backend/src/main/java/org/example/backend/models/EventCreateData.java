package org.example.backend.models;

public class EventCreateData {
    public String name;

    public EventCreateData() {
    }

    public EventCreateData(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
