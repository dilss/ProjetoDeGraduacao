package com.imrsac.services;

import java.util.List;
import org.jboss.logging.Logger;

import com.imrsac.dao.entities.area.Area;
import com.imrsac.dao.entities.soil.Soil;
import com.imrsac.dao.repositories.AreaRepository;
import com.imrsac.dao.repositories.SoilRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.mappers.area.CoordinateMapper;
import com.imrsac.models.area.UpdateAreaRequest;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class AreaService {

    @Inject
    private AreaRepository areaRepository;

    @Inject
    private SoilRepository soilRepository;

    private static final Logger LOG = Logger.getLogger(AreaService.class);

    public List<Area> getAllAreas() throws IMRSACExeption {
        try {
            return this.areaRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_AREAS);
        }
    }

    public Area createArea(Area area, Long soilId) throws IMRSACExeption {
        try {
            this.areaRepository.persist(area);
            area.coordinates.forEach(coordinate -> {
                coordinate.areaId = area.id;
                coordinate.persist();
            });
            if (soilId != null) {
                Soil soil = this.soilRepository.findById(soilId);
                area.soil = soil;
            }
            return area;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_AREA);
        }
    }

    public Area editArea(Long areadId, UpdateAreaRequest newData) throws IMRSACExeption {
        try {
            Area areaToUpdate = this.areaRepository.findById(areadId);
            areaToUpdate.name = newData.getName();
            areaToUpdate.coordinates.forEach(coordinate -> coordinate.delete());
            CoordinateMapper.fromUpdateToCoordinateEntitySet(newData.getCoordinates())
                    .forEach(coordinate -> coordinate.persist());
            if (newData.getSoilId() != null) {
                Soil soil = this.soilRepository.findById(newData.getSoilId());
                areaToUpdate.soil = soil;
            } else {
                areaToUpdate.soil = null;
            }
            return areaToUpdate;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_AREA);
        }
    }

    public Area findAreaById(Long areaId) throws IMRSACExeption {
        try {
            return this.areaRepository.findByIdOptional(areaId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.AREA_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public boolean deleteArea(Long areaId) throws IMRSACExeption {
        try {
            Area area = this.areaRepository.findById(areaId);
            area.soil = null;
            return this.areaRepository.deleteById(areaId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_AREA);
        }
    }
}
