package com.mirriga.dao.entities;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "areas")
public class AreaEntity extends PanacheEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @Column(nullable = false)
    private Double area;

    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinColumn(name = "area_id")
    @Builder.Default
    private Set<CoordinateEntity> coordinates = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "soil_id")
    @JsonIgnoreProperties({ "associatedAreas", "createdAt" })
    private SoilEntity soil;

    @OneToOne(mappedBy = "area", cascade = { CascadeType.REMOVE })
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem" })
    private PlantationEntity plantation;

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}
