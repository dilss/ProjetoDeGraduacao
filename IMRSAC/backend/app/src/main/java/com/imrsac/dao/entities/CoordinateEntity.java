package com.imrsac.dao.entities;

import java.math.BigDecimal;
import java.time.Instant;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "coordinates")
@IdClass(CoordinateEntity.CoordinateId.class)
public class CoordinateEntity extends PanacheEntityBase {

    @Id
    private BigDecimal latitude;

    @Id
    private BigDecimal longitude;

    @Column(name = "node_order", nullable = false)
    private Long nodeOrder;

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @EqualsAndHashCode
    public static class CoordinateId {
        @Column(nullable = false, precision = 21, scale = 18)
        private BigDecimal latitude;

        @Column(nullable = false, precision = 21, scale = 18)
        private BigDecimal longitude;
    }
}
