package com.example.AccentDetection;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class AccentDetectionApplication {
	public static void main(String[] args) {
//		Dotenv dotenv = Dotenv.load();
//		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		SpringApplication.run(AccentDetectionApplication.class, args);
	}
}
