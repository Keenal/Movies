package com.example.demo.controller;

import java.util.List;

import com.example.demo.model.Movies;

import com.example.demo.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping("/movies")
    List<Movies> getMovies() {
        return movieRepository.findAll();
    }

    
    
}
