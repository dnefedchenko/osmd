package com.freeman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by freeman on 21.02.18.
 */
@Controller
public class HomeController {
    @RequestMapping(value = "/home")
    public String home(Model model) {
        model.addAttribute("name", "Armeyskiy");
        return "home";
    }
}
