package com.imrsac.dao.entities.area;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.imrsac.dao.entities.plantation.Plantation;
import com.imrsac.dao.entities.soil.Soil;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "areas")
public class Area extends PanacheEntity {

    @Column(length = 100, nullable = false)
    public String name;

    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinColumn(name = "area_id")
    public Set<Coordinate> coordinates = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "soil_id")
    @JsonIgnoreProperties({ "associatedAreas", "createdAt" })
    public Soil soil;

    @OneToOne(mappedBy = "area", cascade = { CascadeType.REMOVE })
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem" })
    public Plantation plantation;

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();
}
