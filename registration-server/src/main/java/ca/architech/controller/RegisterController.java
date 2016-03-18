package ca.architech.controller;

import ca.architech.model.User;
import ca.architech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class RegisterController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public User create(@RequestBody User user) {
        return userRepository.saveAndFlush(user);
    }

}
