package com.example.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HelloWorld {

	public static void main(String[] args) {
		SpringApplication.run(HelloWorld.class, args);
	}

}

// mvn spring-boot:run - without Docker