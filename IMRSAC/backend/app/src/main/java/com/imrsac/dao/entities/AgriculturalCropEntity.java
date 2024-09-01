package com.imrsac.dao.entities;

import java.time.Instant;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "agricultural_crops")
public class AgriculturalCropEntity extends PanacheEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @Column(name = "root_depth_cm", nullable = false)
    private Long rootDepth;

    @Column(name = "water_availability_factor", nullable = false)
    private Double waterAvailabilityFactor;

    @Column(name = "cicle_duration_days", nullable = false)
    private Long cicleDurationDays;

    @Column(name = "duration_percentage_phase_one", nullable = false)
    private Long durationPercentagePhaseOne;

    @Column(name = "duration_percentage_phase_two", nullable = false)
    private Long durationPercentagePhaseTwo;

    @Column(name = "duration_percentage_phase_three", nullable = false)
    private Long durationPercentagePhaseThree;

    @Column(name = "duration_percentage_phase_four", nullable = false)
    private Long durationPercentagePhaseFour;

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "agriculturalCrop", cascade = { CascadeType.REMOVE })
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem", "sensors" })
    private Set<PlantationEntity> plantations;
}
