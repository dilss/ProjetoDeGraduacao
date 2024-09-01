package com.imrsac.dao.entities;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "soil")
public class SoilEntity extends PanacheEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @Column(name = "cc", nullable = false)
    private Float fieldCapacity;

    @Column(name = "pmp", nullable = false)
    private Float permanentWiltingPoint;

    @Column(nullable = false)
    private Float density;

    @Builder.Default
    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "soil")
    @JsonIgnoreProperties({ "soil", "coordinates", "createdAt" })
    private Set<AreaEntity> associatedAreas = new HashSet<>();
}
