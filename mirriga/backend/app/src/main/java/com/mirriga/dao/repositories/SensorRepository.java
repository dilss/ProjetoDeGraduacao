package com.mirriga.dao.repositories;

import com.mirriga.dao.entities.SensorEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class SensorRepository implements PanacheRepositoryBase<SensorEntity, String> {

}
