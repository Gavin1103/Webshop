package caaruujuuwoo65.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class HomeController {


    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to the Spring Boot Application!");
        return "home";
    }
}
