package com.imrsac.dao.entities.area;

import java.math.BigDecimal;
import java.time.Instant;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "coordinates")
@IdClass(CoordinateKey.class)
public class Coordinate extends PanacheEntityBase {

    @Id
    public Long areaId;

    @Id
    public Long nodeOrder;

    @Column(nullable = false, precision = 21, scale = 18)
    public BigDecimal latitude;

    @Column(nullable = false, precision = 21, scale = 18)
    public BigDecimal longitude;

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();
}
