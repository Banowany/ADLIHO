package org.example.backend.controllers;

import org.example.backend.models.Expense;
import org.example.backend.models.ExpenseCreateData;
import org.example.backend.models.User;
import org.example.backend.repositories.ExpenseRepository;
import org.example.backend.repositories.UserRepository;
import org.example.backend.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events/{eventId}/users/{userId}/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense createExpense(@PathVariable Long userId, @RequestBody ExpenseCreateData expenseCreateData) {
        return expenseService.createExpense(userId, expenseCreateData);
    }
}
