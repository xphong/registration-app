package ca.architech.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class User {
    @GeneratedValue
    @Id
    private Long id;

    @NotNull
    @Size(min = 5, max = 30, message = "Username must at least 5 characters.")
    private String username;

    @NotNull
    @Size(min = 8, max = 30, message = "Password must at least 8 characters.")
    private String password;

    public User() { }

    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
