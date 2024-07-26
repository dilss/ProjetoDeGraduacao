package com.imrsac.dao.entities.irrigation_system;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.imrsac.dao.entities.plantation.Plantation;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
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

    @OneToOne(mappedBy = "irrigationSystem", cascade = { CascadeType.REMOVE })
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem" })
    public Plantation plantation;
}
