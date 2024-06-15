package org.example.backend.controllers;

import org.example.backend.models.Expense;
import org.example.backend.models.ExpenseCreateData;
import org.example.backend.models.User;
import org.example.backend.repositories.ExpenseRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events/{eventId}/users/{userId}/expenses")
public class ExpenseController {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExpenseController(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Expense createExpense(@PathVariable Long userId, @RequestBody ExpenseCreateData expenseCreateData) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Expense expense = new Expense(expenseCreateData.amount, expenseCreateData.description, user);
        return expenseRepository.save(expense);
    }
}
