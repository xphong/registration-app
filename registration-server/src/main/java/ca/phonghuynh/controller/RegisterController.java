package ca.phonghuynh.controller;

import ca.phonghuynh.exception.UsernameInUseException;
import ca.phonghuynh.model.User;
import ca.phonghuynh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class RegisterController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody User user) throws UsernameInUseException {
        if (userService.findByUsername(user.getUsername()) != null) {
            throw new UsernameInUseException();
        }

        userService.createUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
