package org.example.backend.services;

import org.example.backend.models.Expense;
import org.example.backend.models.ExpenseCreateData;
import org.example.backend.models.User;
import org.example.backend.repositories.ExpenseRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public Expense createExpense(Long userId, ExpenseCreateData expenseCreateData) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Expense expense = new Expense(expenseCreateData.amount, expenseCreateData.description, user);
        return expenseRepository.save(expense);
    }
}
