package com.imrsac.services;

import java.util.List;
import org.jboss.logging.Logger;

import com.imrsac.dao.entities.area.Area;
import com.imrsac.dao.repositories.AreaRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class AreaService {

    @Inject
    private AreaRepository areaRepository;

    private static final Logger LOG = Logger.getLogger(AreaService.class);

    public List<Area> getAllAreas() throws IMRSACExeption {
        try {
            return this.areaRepository.listAll();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_AREAS);
        }
    }

    public Long createArea(Area area) throws IMRSACExeption {
        try {
            this.areaRepository.persist(area);
            return area.id;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_AREA);
        }
    }

    public Area findAreaById(Long areaId) throws IMRSACExeption {
        try {
            return this.areaRepository.findByIdOptional(areaId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.AREA_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw e;
        }
    }

    public boolean deleteArea(Long areaId) throws IMRSACExeption {
        try {
            Area area =  this.areaRepository.findById(areaId);
            area.soil = null;
            return this.areaRepository.deleteById(areaId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_AREA);
        }
    }
}
