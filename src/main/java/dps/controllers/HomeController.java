package dps.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by jiaweizhang on 2/1/2016.
 */

@RestController
@RequestMapping("/api/home")
public class HomeController {
  @RequestMapping(value = "/register",
            method = RequestMethod.GET)
    @ResponseBody
    public String home() {
        return "home";
    }
}


