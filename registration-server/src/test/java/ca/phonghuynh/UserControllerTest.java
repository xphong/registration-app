package ca.phonghuynh;

import ca.phonghuynh.controller.UserController;
import ca.phonghuynh.model.User;
import ca.phonghuynh.service.UserService;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class UserControllerTest {
    @InjectMocks
    private UserController uc;

    @Mock
    private UserService userService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldGetUserById() {
        User user = new User();
        user.setId(1l);
        when(userService.getUser(1l)).thenReturn(user);

        ResponseEntity<?> results = uc.get(1l);

        User user1 = (User) results.getBody();

        verify(userService).getUser(1l);
        assertThat(user1.getId(), is(1l));
    }
}
