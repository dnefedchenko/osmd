package com.freeman.service;

import java.time.LocalTime;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Dmitriy Nefedchenko on 06.03.18.
 */
public class ParkingTimeTask {
    private LocalTime entranceTime;
    private String parkingTime;
    private LocalTime exitTime;
    private Timer countDownTimer;

    public ParkingTimeTask(LocalTime entranceTime, String parkingTime) {
        this.entranceTime = entranceTime;
        this.parkingTime = parkingTime;
        this.exitTime = entranceTime.plusMinutes((long)(Double.parseDouble(parkingTime)*60));
        this.countDownTimer = new Timer();
    }

    public void startTimeTracking() {
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {

            }
        };
    }
}
