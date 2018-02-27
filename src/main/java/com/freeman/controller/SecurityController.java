package com.freeman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Dmitry Nefedchenko on 23.02.18.
 */
@Controller
@RequestMapping(value = "/login")
public class SecurityController {
    @GetMapping
    public String serveLoginForm() {
        return "login";
    }
}
