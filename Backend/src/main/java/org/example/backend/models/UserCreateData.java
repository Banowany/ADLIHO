package org.example.backend.models;

public class UserCreateData {
    public String name;

    public UserCreateData() {
    }

    public UserCreateData(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
