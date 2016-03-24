package ca.phonghuynh.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST, reason="Username in use")
public class UsernameInUseException extends Exception {

}
