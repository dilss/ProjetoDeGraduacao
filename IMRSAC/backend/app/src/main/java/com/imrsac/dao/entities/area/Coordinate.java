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
@IdClass(CoordinateId.class)
public class Coordinate extends PanacheEntityBase {

    @Id
    public BigDecimal latitude;

    @Id
    public BigDecimal longitude;

    @Column(name = "node_order", nullable = false)
    public Long nodeOrder;

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();
}
