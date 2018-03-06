package com.freeman.service;

import com.freeman.model.VisitorEntry;

import java.util.Timer;
import java.util.TimerTask;

import static com.freeman.model.ParkingStatus.*;

/**
 * Created by Dmitriy Nefedchenko on 06.03.18.
 */
public class ParkingTimeTask {
    private Timer countDownTimer;
    private Long parkingTime;
    private Long elapsedTime;

    public ParkingTimeTask(VisitorEntry visitorEntry) {
        this.countDownTimer = new Timer();
        this.parkingTime = (long)(60*60*Double.parseDouble(visitorEntry.getParkingTime()));
    }

    public void startTimeTracking() {
        this.elapsedTime = this.parkingTime;

        countDownTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                elapsedTime-=5;
                if (elapsedTime > 0 && elapsedTime % 10 == 0) {
                    System.out.println(String.format("Elapsed time: %s, status: %s", elapsedTime, ALLOWED));
                } else if (elapsedTime <= 0 && Math.abs(elapsedTime) < 15 && elapsedTime % 10 == 0) {
                    System.out.println(String.format("Elapsed time: %s, status: %s", elapsedTime, ACCEPTABLE));
                } else if (elapsedTime < 0 && Math.abs(elapsedTime) > 15) {
                    System.out.println(String.format("Elapsed time: %s, status: %s", elapsedTime, OVERDUE));
                    countDownTimer.cancel();
                }

            }
        }, 0, 5000);
    }

    public static void main(String[] args) {
        VisitorEntry visitor = new VisitorEntry();
        visitor.setParkingTime("0.05");
        ParkingTimeTask parkingTimeTask = new ParkingTimeTask(visitor);
        parkingTimeTask.startTimeTracking();
    }
}
