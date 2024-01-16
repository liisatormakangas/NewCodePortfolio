package com.simplegame.mysimplegame;

import jakarta.persistence.*;

@Entity
@Table(name = "player")

public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    @Column(name = "username")
    private String name;

    @Column(name = "movement")
    private String movement;

    @Column(name = "victories")
    private int victories;

    @Column(name = "rating")
    private String rating;
  
    public Player(String name) {
        this.name = name;
        this.victories = 0;
        this.rating = "";
    }
    public Player() {
        this.name = "";
        this.victories = 0;
        this.rating = "";
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMovement() {
        return movement;
    }

    public void setMovement(String movement) {
        this.movement = movement;
    }

    public int getVictories() {
        return victories;
    }
    
    public void setVictories(int victories) {
        this.victories = victories;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
}
