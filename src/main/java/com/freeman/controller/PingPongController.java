package com.freeman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Dmitriy Nefedchenko on 23.03.2018.
 */
@RestController
@RequestMapping(value = "/ping")
public class PingPongController {
    private Logger logger = LoggerFactory.getLogger(PingPongController.class);

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public void ping() {
        logger.info("PingPongController response to keep application up and running");
    }
}
