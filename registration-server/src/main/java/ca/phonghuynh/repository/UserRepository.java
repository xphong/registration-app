package ca.phonghuynh.repository;

import ca.phonghuynh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findOneByUsername(String username);
    User findOneByPassword(String password);
}
