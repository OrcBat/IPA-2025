package com.ipa.orcirecords.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI defineOpenApi() {
        Server server = new Server();
        server.setUrl("http://localhost:8080/");

        Contact myContact = new Contact();
        myContact.setName("Orcun Bat");
        myContact.setEmail("orcun.bat@outlook.com");

        Info information = new Info()
                .title("OrciRecords API")
                .version("1.0")
                .description("This API exposes endpoints to manage music data.")
                .contact(myContact);
        return new OpenAPI().info(information).servers(List.of(server));
    }
}