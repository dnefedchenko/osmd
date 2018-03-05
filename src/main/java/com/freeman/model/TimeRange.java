package com.freeman.model;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Dmitriy Nefedchenko on 02.03.2018.
 */
public enum TimeRange {
    HALF_AN_HOUR("0.5"),
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

    public static List<String> getAllOptions() {
        return Stream.of(values()).map(entry -> entry.range).collect(Collectors.toList());
    }
}
