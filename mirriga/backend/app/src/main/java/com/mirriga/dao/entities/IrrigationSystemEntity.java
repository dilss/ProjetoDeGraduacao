package com.mirriga.dao.entities;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "irrigation_systems")
public class IrrigationSystemEntity extends PanacheEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String category;

    @Column(length = 100, nullable = false)
    private String type;

    @Column( nullable = false)
    private Double efficiency;

    @Column(name = "flow_rate", nullable = false)
    private Long flowRate;

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @OneToOne(mappedBy = "irrigationSystem", cascade = { CascadeType.REMOVE })
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem" })
    private PlantationEntity plantation;
}
