package com.simplegame.mysimplegame;

public class GameMoveValidator extends MoveValidator {
    @Override
    public boolean isValidMove(String move) {
        return !move.equals("rock") && !move.equals("paper") && !move.equals("scissors");
    }
}
