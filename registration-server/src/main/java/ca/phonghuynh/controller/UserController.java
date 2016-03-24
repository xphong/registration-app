package ca.phonghuynh.controller;

import ca.phonghuynh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }
}
