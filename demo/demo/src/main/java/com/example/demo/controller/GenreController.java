package com.example.demo.controller;

import java.util.Collection;

import com.example.demo.model.Genre;
import com.example.demo.repository.GenreRepository;

import org.springframework.web.bind.annotation.GetMapping;
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
        return genreRepository.findAll(); //select * from genre
    }
}
