package com.mirriga.dao.repositories;

import com.mirriga.dao.entities.IrrigationSystemEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class IrrigationSystemRepository implements PanacheRepository<IrrigationSystemEntity> {
}
