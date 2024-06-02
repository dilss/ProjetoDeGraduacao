package com.imrsac.dao.repositories;

import com.imrsac.dao.entities.area.Area;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class AreaRepository implements PanacheRepository<Area> {

    public Long createArea(Area area) {
        persist(area);
        return area.id;
    }  
}
