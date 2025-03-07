package com.ipa.orcirecords;

import com.ipa.orcirecords.controller.UserController;
import com.ipa.orcirecords.dto.UserDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private Authentication authentication;

    @Mock
    private GrantedAuthority grantedAuthority1;

    @Mock
    private GrantedAuthority grantedAuthority2;

    @Test
    public void testGetCurrentUser_Authenticated() {
        String username = "testUser";

        when(grantedAuthority1.getAuthority()).thenReturn("ROLE_USER");
        when(grantedAuthority2.getAuthority()).thenReturn("ROLE_ADMIN");

        List<GrantedAuthority> authorities = Arrays.asList(grantedAuthority1, grantedAuthority2);

        when(authentication.getName()).thenReturn(username);
        when(authentication.getAuthorities()).thenReturn((List) authorities);

        ResponseEntity<UserDTO> response = userController.getCurrentUser(authentication);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        UserDTO userDTO = response.getBody();
        assertNotNull(userDTO);
        assertEquals(username, userDTO.getUsername());
        assertTrue(userDTO.getRoles().contains("ROLE_USER"));
        assertTrue(userDTO.getRoles().contains("ROLE_ADMIN"));
    }

    @Test
    public void testGetCurrentUser_Unauthenticated() {
        ResponseEntity<UserDTO> response = userController.getCurrentUser(null);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}
