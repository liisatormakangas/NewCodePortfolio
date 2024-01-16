package com.simplegame.mysimplegame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MysimplegameApplication {

	public static void main(String[] args) {
		SpringApplication.run(MysimplegameApplication.class, args);
	}
	@Bean
    public MoveValidator gameMoveValidator() {
        return new GameMoveValidator();
	}
}
