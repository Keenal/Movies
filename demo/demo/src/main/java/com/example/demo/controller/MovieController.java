package com.example.demo.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import com.example.demo.model.Movie;

import com.example.demo.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping("/movies")
    List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @DeleteMapping("/movies/{id}")
    ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/movies")
    ResponseEntity<?> createMovie(@Validated @RequestBody Movie movie) throws URISyntaxException {
        Movie result = movieRepository.save(movie);
        return ResponseEntity.created(new URI("/api/movies" + result.getId())).body(result);
    }

    @PutMapping("/movies/{id}")
    ResponseEntity<Movie> updateMovies(@Validated @RequestBody Movie movie) {
        Movie result = movieRepository.save(movie);
        return ResponseEntity.ok().body(result);
    }
    
}
