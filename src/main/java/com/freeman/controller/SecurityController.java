package com.freeman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by Dmitry Nefedchenko on 23.02.18.
 */
@Controller
public class SecurityController {
    @GetMapping(value = "/login")
    public String serveLoginForm() {
        return "login";
    }
}
