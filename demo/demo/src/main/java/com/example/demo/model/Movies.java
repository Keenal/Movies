package com.example.demo.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name="movies")
public class Movies {

    @Id
    private Long id;

    private Instant moviedate;

    private String descript;

    @ManyToOne
    private Genre genre;

    @ManyToOne
    private User user;

    
    
}