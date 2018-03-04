package com.freeman.model;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
public enum TimeRange {
    THIRTY_MINUTES("30"),
    ONE_HOUR("1"),
    ONE_AND_A_HALF_HOUR("1.5"),
    TWO_HOURS("2"),
    TWO_AND_A_HALF_HOURS("2.5"),
    THREE_HOURS("3"),
    THREE_AND_A_HALF_HOURS("3.5"),
    FOUR_HOURS("4"),
    FOUR_AND_A_HALF_HOURS("4.5"),
    FIVE_HOURS("5");

    String range;

    TimeRange(String range) {
        this.range = range;
    }

    public String getRange() {
        return range;
    }
}
