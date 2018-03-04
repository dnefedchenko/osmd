package com.freeman.model;

import java.time.LocalTime;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
public class VisitorEntry {
    private String id;
    private String vehicleNumber;
    private LocalTime entranceTime;
    private String elapsedTime;
    private String parkingTime;

    public VisitorEntry() {

    }

    public VisitorEntry(String id, String vehicleNumber, LocalTime entranceTime, String elapsedTime) {
        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.entranceTime = entranceTime;
        this.elapsedTime = elapsedTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public LocalTime getEntranceTime() {
        return entranceTime;
    }

    public void setEntranceTime(LocalTime entranceTime) {
        this.entranceTime = entranceTime;
    }

    public String getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(String elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public String getParkingTime() {
        return parkingTime;
    }

    public void setParkingTime(String parkingTime) {
        this.parkingTime = parkingTime;
    }

    @Override
    public String toString() {
        return "VisitorEntry{" +
                "id='" + id + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", entranceTime=" + entranceTime +
                ", elapsedTime=" + elapsedTime +
                ", parkingTime=" + parkingTime +
                '}';
    }
}
