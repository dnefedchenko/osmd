package com.freeman.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitriy Nefedchenko on 03.03.2018.
 */
@Service
public class VehicleRegistrationNumberService {
    private List<String> vrns = new ArrayList<>();

    public VehicleRegistrationNumberService() {
        this.vrns.add("AI0640BO");
        this.vrns.add("AA4470IM");
        this.vrns.add("AK9265AK");
        this.vrns.add("CA3521EH");
        this.vrns.add("BH3395EX");
    }

    public List<String> getVrns() {
        return vrns;
    }
}
