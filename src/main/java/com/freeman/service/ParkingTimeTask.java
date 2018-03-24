package com.freeman.service;

import com.freeman.model.NotificationMessage;
import com.freeman.model.VisitorEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Timer;
import java.util.TimerTask;

import static com.freeman.model.ParkingStatus.*;

/**
 * Created by Dmitriy Nefedchenko on 06.03.18.
 */
public class ParkingTimeTask {
    private Logger logger = LoggerFactory.getLogger(ParkingTimeTask.class);

    private Timer countDownTimer;
    private String id;
    private Long parkingTime;
    private Long remainingTime;
    private SimpMessagingTemplate messagingTemplate;

    public ParkingTimeTask(VisitorEntry visitor, SimpMessagingTemplate messagingTemplate) {
        this.countDownTimer = new Timer();
        this.id = visitor.getVehicleNumber();
        this.parkingTime = (long)(60*Double.parseDouble(visitor.getParkingTime()));
        this.messagingTemplate = messagingTemplate;
    }

    public void startTimeTracking() {
        this.remainingTime = this.parkingTime;

        countDownTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (remainingTime != parkingTime && remainingTime >= 0) {
                    logger.info(String.format("Elapsed time: %s, status: %s", remainingTime, allowed));
                    messagingTemplate.convertAndSend("/topic", new NotificationMessage(id, parkingTime - remainingTime, allowed.name()));
                } else if (remainingTime < 0 && Math.abs(remainingTime) <= 1) {
                    logger.info(String.format("Elapsed time: %s, status: %s", remainingTime, acceptable));
                    messagingTemplate.convertAndSend("/topic", new NotificationMessage(id, parkingTime - remainingTime, acceptable.name()));
                } else if (remainingTime < 0 && Math.abs(remainingTime) > 1) {
                    logger.info(String.format("Elapsed time: %s, status: %s", remainingTime, overdue));
                    messagingTemplate.convertAndSend("/topic", new NotificationMessage(id, parkingTime - remainingTime, overdue.name()));
                    countDownTimer.cancel();
                }

                remainingTime -=1;
            }
        }, 0, 60000);
    }

    public String getId() {
        return id;
    }

    public void complete() {
        this.countDownTimer.cancel();
    }
}
