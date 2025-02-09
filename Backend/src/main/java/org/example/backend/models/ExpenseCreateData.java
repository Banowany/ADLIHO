package org.example.backend.models;

public class ExpenseCreateData {
    public double amount;
    public String description;

    public ExpenseCreateData() {
    }

    public ExpenseCreateData(double amount, String description) {
        this.amount = amount;
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
