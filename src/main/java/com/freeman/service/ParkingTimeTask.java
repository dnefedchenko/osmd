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
    private Long elapsedTime;
    private SimpMessagingTemplate messagingTemplate;

    public ParkingTimeTask(VisitorEntry visitor, SimpMessagingTemplate messagingTemplate) {
        this.countDownTimer = new Timer();
        this.id = visitor.getVehicleNumber();
        this.parkingTime = (long)(60*Double.parseDouble(visitor.getParkingTime()));
        this.messagingTemplate = messagingTemplate;
    }

    public void startTimeTracking() {
        this.elapsedTime = this.parkingTime;

        countDownTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (elapsedTime != parkingTime && elapsedTime >= 0) {
                    logger.info(String.format("Elapsed time: %s, status: %s", elapsedTime, allowed));
                    messagingTemplate.convertAndSend("/topic", new NotificationMessage(id, parkingTime - elapsedTime, allowed.name()));
                } else if (elapsedTime < 0 && Math.abs(elapsedTime) <= 1) {
                    logger.info(String.format("Elapsed time: %s, status: %s", elapsedTime, acceptable));
                    messagingTemplate.convertAndSend("/topic", new NotificationMessage(id, parkingTime - elapsedTime, acceptable.name()));
                } else if (elapsedTime < 0 && Math.abs(elapsedTime) > 1) {
                    logger.info(String.format("Elapsed time: %s, status: %s", elapsedTime, overdue));
                    messagingTemplate.convertAndSend("/topic", new NotificationMessage(id, parkingTime - elapsedTime, overdue.name()));
                    countDownTimer.cancel();
                }

                elapsedTime-=1;
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
