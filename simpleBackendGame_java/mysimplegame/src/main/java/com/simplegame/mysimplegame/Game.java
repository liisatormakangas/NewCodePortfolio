package com.simplegame.mysimplegame;

import jakarta.persistence.*;

@Entity
@Table(name = "games")

public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_game")
    private Long id;

    @Column(name = "player1")
    private String player1;

    @Column(name = "player2")
    private String player2;

    @Column(name = "winner")
    private String winner;

    public Game(String player1, String player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.winner = "";
    }

    public Game() {
        this.player1 = "";
        this.player2 = "";
        this.winner = "";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String getGameWinner(Player player1, Player player2) {
        String move1 = player1.getMovement();
        String move2 = player2.getMovement();

        if (move1.equals(move2)) {
            return "Tie!";
        } else if ((move1.equals("rock") && move2.equals("scissors")) ||
                (move1.equals("scissors") && move2.equals("paper")) ||
                (move1.equals("paper") && move2.equals("rock"))) {
            return player1.getName() + " wins!";
        } else {
            return player2.getName() + " wins!";
        }
    }
}
