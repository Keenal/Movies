package com.example.demo.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name="movie")
public class Movie {

    @Id
    private Long id;

    private Instant moviedate;

    private String descript;

    private String personalNote;

    @ManyToOne
    private Genre genre;

    @JsonIgnore
    @ManyToOne
    private User user;

    
    
}
