package com.imrsac.dao.entities.irrigation_system;

import java.time.Instant;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "irrigation_systems")
public class IrrigationSystem extends PanacheEntity {

    @Column(length = 100, nullable = false)
    public String name;

    @Column(length = 100, nullable = false)
    public String category;

    @Column(length = 100, nullable = false)
    public String type;

    @Column( nullable = false)
    public Double efficiency;

    @Column(name = "flow_rate", nullable = false)
    public Long flowRate;

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();
}
