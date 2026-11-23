package com.example.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class HelloWorld {

	@RequestMapping("/hello")
	String home() {
		return "Hello World!";
	}

	public static void main(String[] args) {
		SpringApplication.run(HelloWorld.class, args);
	}

}

// mvn spring-boot:run - without Docker