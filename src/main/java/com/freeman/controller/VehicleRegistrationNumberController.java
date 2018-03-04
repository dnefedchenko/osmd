package com.freeman.controller;

import com.freeman.service.VehicleRegistrationNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by freeman on 21.02.18.
 */
@RestController
@RequestMapping(value = "/vehicle-registration-numbers")
public class VehicleRegistrationNumberController {
    private VehicleRegistrationNumberService vehicleRegistrationNumberService;

    @Autowired
    public VehicleRegistrationNumberController(VehicleRegistrationNumberService vehicleRegistrationNumberService) {
        this.vehicleRegistrationNumberService = vehicleRegistrationNumberService;
    }

    @GetMapping
    public ResponseEntity<List<String>> getVehicleRegistrationNumbers() {
        return new ResponseEntity<>(this.vehicleRegistrationNumberService.getVrns(), HttpStatus.OK);
    }
}
