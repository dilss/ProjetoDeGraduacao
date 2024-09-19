package com.mirriga.services;

import java.util.List;
import org.jboss.logging.Logger;

import com.mirriga.dao.entities.AreaEntity;
import com.mirriga.dao.entities.SoilEntity;
import com.mirriga.dao.repositories.AreaRepository;
import com.mirriga.dao.repositories.SoilRepository;
import com.mirriga.exceptions.MirrigaErrorEnum;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.AreaRequestDto;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class AreaService {

    @Inject
    private AreaRepository areaRepository;

    @Inject
    private SoilRepository soilRepository;

    private static final Logger LOG = Logger.getLogger(AreaService.class);

    public List<AreaEntity> getAllAreas() throws MirrigaException {
        try {
            return this.areaRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_FETCHING_AREAS);
        }
    }

    public AreaEntity createArea(AreaEntity area, Long soilId) throws MirrigaException {
        try {
            this.areaRepository.persist(area);
            if (soilId != null) {
                SoilEntity soil = this.soilRepository.findById(soilId);
                area.setSoil(soil);
            }
            return area;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_PERSISTING_AREA);
        }
    }

    public AreaEntity editArea(Long areadId, AreaRequestDto newData) throws MirrigaException {
        try {
            AreaEntity areaToUpdate = this.areaRepository.findById(areadId);
            areaToUpdate.setName(newData.getName());
            if (newData.getSoilId() != null) {
                SoilEntity soil = this.soilRepository.findById(newData.getSoilId());
                areaToUpdate.setSoil(soil);
            } else {
                areaToUpdate.setSoil(null);
            }
            return areaToUpdate;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_UPDATING_AREA);
        }
    }

    public AreaEntity findAreaById(Long areaId) throws MirrigaException {
        try {
            return this.areaRepository.findByIdOptional(areaId)
                    .orElseThrow(() -> new MirrigaException(MirrigaErrorEnum.AREA_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public boolean deleteArea(Long areaId) throws MirrigaException {
        try {
            AreaEntity area = this.areaRepository.findById(areaId);
            area.setSoil(null);
            return this.areaRepository.deleteById(areaId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_REMOVING_AREA);
        }
    }
}
