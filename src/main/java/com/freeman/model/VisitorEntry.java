package com.freeman.model;

import java.time.LocalTime;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
public class VisitorEntry {
    private String id;
    private String vehicleNumber;
    private LocalTime entranceTime;
    private LocalTime exitTime;
    private String elapsedTime;
    private String parkingTime;
    private ParkingStatus status;

    public VisitorEntry() {
        this.status = ParkingStatus.ALLOWED;
    }

    public VisitorEntry(String id, String vehicleNumber, LocalTime entranceTime, LocalTime exitTime, String elapsedTime) {
        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.entranceTime = entranceTime;
        this.exitTime = exitTime;
        this.elapsedTime = elapsedTime;
        this.status = ParkingStatus.ALLOWED;
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

    public LocalTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(LocalTime exitTime) {
        this.exitTime = exitTime;
    }

    public String getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTimeMinutes(String elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public String getParkingTime() {
        return parkingTime;
    }

    public void setParkingTime(String parkingTime) {
        this.parkingTime = parkingTime;
    }

    public ParkingStatus getStatus() {
        return status;
    }

    public void setStatus(ParkingStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "VisitorEntry{" +
                "id='" + id + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", entranceTime=" + entranceTime +
                ", exitTime=" + exitTime +
                ", elapsedTime='" + elapsedTime + '\'' +
                ", parkingTime='" + parkingTime + '\'' +
                ", status=" + status +
                '}';
    }
}
