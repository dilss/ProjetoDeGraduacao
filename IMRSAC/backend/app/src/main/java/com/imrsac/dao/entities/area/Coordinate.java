package com.imrsac.dao.entities.area;

import java.math.BigDecimal;
import java.time.Instant;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "coordinates")
public class Coordinate extends PanacheEntity {
    
    @Column(nullable = false, precision = 21, scale = 18)
    public BigDecimal latitude;

    @Column(nullable = false, precision = 21, scale = 18)
    public BigDecimal longitude;

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();
}
