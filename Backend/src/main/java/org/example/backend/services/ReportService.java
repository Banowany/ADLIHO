package org.example.backend.services;

import org.example.backend.models.Event;
import org.example.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {
    private final EventService eventService;

    @Autowired
    public ReportService(EventService eventService) {
        this.eventService = eventService;
    }

    public Map<String, Map<String, Double>> generateReport(Long eventId) {
        Map<String, Map<String, Double>> eventReport = new HashMap<>();
        Event event = eventService.getEvent(eventId);
        int userCount = event.getUsers().size();
        double equalShare = event.getTotalExpenses() / userCount;

        Map<String, Double> userAtLoss = new HashMap<>();
        double totalLoss = 0.0;
        Map<String, Double> userAtGain = new HashMap<>();
        for (User user : event.getUsers()) {
            double userExpenses = user.getTotalExpenses();
            if (userExpenses > equalShare) {
                userAtLoss.put(user.getName(), userExpenses - equalShare);
                totalLoss += userExpenses - equalShare;
            } else {
                userAtGain.put(user.getName(), equalShare - userExpenses);
            }
        }

        for (var gainEntry : userAtGain.entrySet()) {
            eventReport.put(gainEntry.getKey(), new HashMap<>());
            var userReport = eventReport.get(gainEntry.getKey());
            for (var lossEntry : userAtLoss.entrySet()) {
                double gain = gainEntry.getValue();
                double loss = lossEntry.getValue();
                userReport.put(lossEntry.getKey(), gain * (loss / totalLoss));
            }
        }

        return eventReport;
    }
}
