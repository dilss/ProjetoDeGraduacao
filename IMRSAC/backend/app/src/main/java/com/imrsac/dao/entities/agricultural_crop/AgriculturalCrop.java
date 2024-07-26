package com.imrsac.dao.entities.agricultural_crop;

import java.time.Instant;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.imrsac.dao.entities.plantation.Plantation;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Entity
@Table(name = "agricultural_crops")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
public class AgriculturalCrop extends PanacheEntity {

    @Column(length = 100, nullable = false)
    public String name;

    @Column(name = "root_depth_cm", nullable = false)
    public Long rootDepth;

    @Column(name = "water_availability_factor", nullable = false)
    public Double waterAvailabilityFactor;

    @Column(name = "cicle_duration_days", nullable = false)
    public Long cicleDurationDays;

    @Column(name = "duration_percentage_phase_one", nullable = false)
    public Long durationPercentagePhaseOne;

    @Column(name = "duration_percentage_phase_two", nullable = false)
    public Long durationPercentagePhaseTwo;

    @Column(name = "duration_percentage_phase_three", nullable = false)
    public Long durationPercentagePhaseThree;

    @Column(name = "duration_percentage_phase_four", nullable = false)
    public Long durationPercentagePhaseFour;

    @Column(name = "created_at", nullable = false)
    public Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "agriculturalCrop", cascade = { CascadeType.REMOVE })
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem" })
    public Set<Plantation> plantations;
}
