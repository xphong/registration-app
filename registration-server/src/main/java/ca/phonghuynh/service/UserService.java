package ca.phonghuynh.service;

import ca.phonghuynh.model.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    User getUser(Long id);
    User createUser(User user);
    User findByUsername(String username);
    User findByPassword(String password);
}
