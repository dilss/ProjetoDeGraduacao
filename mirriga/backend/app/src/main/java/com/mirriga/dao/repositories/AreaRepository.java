package com.mirriga.dao.repositories;

import com.mirriga.dao.entities.AreaEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class AreaRepository implements PanacheRepository<AreaEntity> {
}
