package com.example.demo.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import com.example.demo.model.Genre;
import com.example.demo.repository.GenreRepository;

import org.springframework.http.HttpStatus;
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
public class GenreController {
    private GenreRepository genreRepository;

    public GenreController(GenreRepository genreRepository) {
        super();
        this.genreRepository = genreRepository;
    }

    @GetMapping("/genres")
    Collection<Genre> genres() {
        return genreRepository.findAll(); // select * from genre
    }

    @GetMapping("/genres/{id}")
    ResponseEntity<?> getGenre(@PathVariable Long id) {
        Optional<Genre> genre = genreRepository.findById(id);
        return genre.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    
}
