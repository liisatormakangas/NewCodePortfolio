package com.simplegame.mysimplegame;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class GameController {

    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;
    private final MoveValidator moveValidator;

    public GameController(PlayerRepository playerRepository, GameRepository gameRepository,
            MoveValidator moveValidator) {
        this.playerRepository = playerRepository;
        this.gameRepository = gameRepository;
        this.moveValidator = moveValidator;
    }

    // PostMapping to create a player
    @PostMapping("/player")
    public Player createPlayer(@RequestBody Player player) {
        Player newPlayer = new Player(player.getName());
        return playerRepository.save(newPlayer);
    }

    // PutMapping to update player movement
    @PutMapping("/player/move/{id}")
    public ResponseEntity<?> updatePlayerMove(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        Optional<Player> optionalPlayer = playerRepository.findById(id);
        String movement = requestBody.get("movement");
        System.out.println(movement);

        if (!moveValidator.isValidMove(movement)) {
            if (optionalPlayer.isPresent()) {
                Player updatedPlayer = optionalPlayer.get();
                updatedPlayer.setMovement(movement);
                playerRepository.save(updatedPlayer);
                return ResponseEntity.ok(updatedPlayer);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            String message = "Invalid move. Please enter rock, paper, or scissors.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
    }

    // GetMapping for all players
    @GetMapping("/allplayers")
    public ResponseEntity<?> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        if (players.isEmpty()) {
            String message = "No players found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        } else {
            return ResponseEntity.ok(players);
        }
    }

    // GetMapping for one player by id
    @GetMapping("/player/{id}")
    public ResponseEntity<?> getPlayerById(@PathVariable Long id) {
        Optional<Player> player = playerRepository.findById(id);
        if (player.isPresent()) {
            return ResponseEntity.ok(player.get());
        } else {
            String message = "No player found with id: " + id + ".";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    // DeleteMapping for one player by id
    @DeleteMapping("/player/{id}")
    public ResponseEntity<?> deletePlayerById(@PathVariable Long id) {
        Optional<Player> player = playerRepository.findById(id);
        if (player.isPresent()) {
            playerRepository.deleteById(id);
            String message = "Player with id: " + id + " was deleted.";
            return ResponseEntity.ok(message);
        } else {
            String message = "No player found with id: " + id + ".";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    // GetMapping for all games
    @GetMapping("/allgames")
    public ResponseEntity<?> getAllGames() {
        List<Game> games = gameRepository.findAll();
        if (games.isEmpty()) {
            String message = "No games found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        } else {
            return ResponseEntity.ok(games);
        }
    }

    // GetMapping for one game by id
    @GetMapping("/game/{id}")
    public ResponseEntity<?> getGameById(@PathVariable Long id) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isPresent()) {
            return ResponseEntity.ok(game.get());
        } else {
            String message = "No game found with id: " + id + ".";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    // PostMapping to create a game
    @PostMapping("/game/create")
    public Game createGame(@RequestBody GameRequest gameRequest) {
        // Find the Player objects based on the provided player IDs
        Optional<Player> optionalPlayer1 = playerRepository.findById(gameRequest.getPlayer1Id());
        Optional<Player> optionalPlayer2 = playerRepository.findById(gameRequest.getPlayer2Id());

        if (optionalPlayer1.isPresent() && optionalPlayer2.isPresent()) {
            // Get the player names
            String player1 = optionalPlayer1.get().getName();
            String player2 = optionalPlayer2.get().getName();
            // Create a new Game instance with player1 and player2 names
            Game newGame = new Game(player1, player2);
            return gameRepository.save(newGame);

        } else {
            return null;
        }
    }

    // DeleteMapping for one game by id
    @DeleteMapping("/game/{id}")
    public ResponseEntity<?> deleteGameById(@PathVariable Long id) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isPresent()) {
            gameRepository.deleteById(id);
            String message = "Game with id: " + id + " was deleted.";
            return ResponseEntity.ok(message);
        } else {
            String message = "No game found with id: " + id + ".";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    // GetMapping to find the winner of a game
    @PutMapping("/findWinner/{gameId}")
    public ResponseEntity<String> findWinner(@PathVariable Long gameId, @RequestBody GameRequest gameRequest) {
        Optional<Player> optionalPlayer1 = playerRepository.findById(gameRequest.getPlayer1Id());
        Optional<Player> optionalPlayer2 = playerRepository.findById(gameRequest.getPlayer2Id());
        Optional<Game> gameOptional = gameRepository.findById(gameId);

        if (optionalPlayer1.isPresent() && optionalPlayer2.isPresent()) {
            Player player1 = optionalPlayer1.get();
            Player player2 = optionalPlayer2.get();
            Game game = gameOptional.get();

            String winnerMessage = game.getGameWinner(player1, player2);

            if (!winnerMessage.equals("Tie!")) {
                Player winner = (winnerMessage.equals(player1.getName() + " wins!")) ? player1 : player2;
                winner.setVictories(winner.getVictories() + 1);
                game.setWinner(winner.getName());

                if (winner.getVictories() >= 5) {
                    winner.setRating("expert");
                } else {
                    winner.setRating("beginner");
                }

                playerRepository.save(winner);
                gameRepository.save(game);
            } else {
                game.setWinner("Tie!");
                gameRepository.save(game);
            }
            return ResponseEntity.ok(winnerMessage);

        } else {
            String message = "No game found with id: " + gameId + ".";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }
}
