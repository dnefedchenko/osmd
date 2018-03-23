package com.freeman.model;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
public class VisitorEntry {
    private String vehicleNumber;
    private String entranceTime;
    private String exitTime;
    private String elapsedTime;
    private String parkingTime;
    private ParkingStatus status;

    public VisitorEntry() {
        this.status = ParkingStatus.allowed;
    }

    public VisitorEntry(String vehicleNumber, String entranceTime, String exitTime, String elapsedTime) {
        this.vehicleNumber = vehicleNumber;
        this.entranceTime = entranceTime;
        this.exitTime = exitTime;
        this.elapsedTime = elapsedTime;
        this.status = ParkingStatus.allowed;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getEntranceTime() {
        return entranceTime;
    }

    public void setEntranceTime(String entranceTime) {
        this.entranceTime = entranceTime;
    }

    public String getExitTime() {
        return exitTime;
    }

    public void setExitTime(String exitTime) {
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
                "  vehicleNumber='" + vehicleNumber + '\'' +
                ", entranceTime=" + entranceTime +
                ", exitTime=" + exitTime +
                ", elapsedTime='" + elapsedTime + '\'' +
                ", parkingTime='" + parkingTime + '\'' +
                ", status=" + status +
                '}';
    }
}
