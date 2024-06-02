package com.imrsac.dao.entities.area;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "areas")
public class Area extends PanacheEntity {

    @Column(length = 100, nullable = false)
    public String name;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "area_id")
    public List<Coordinate> coordinates = new ArrayList<>();

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();
}
