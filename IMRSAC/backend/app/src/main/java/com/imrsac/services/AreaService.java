package com.imrsac.services;

import java.util.List;
import org.jboss.logging.Logger;

import com.imrsac.dao.entities.AreaEntity;
import com.imrsac.dao.entities.SoilEntity;
import com.imrsac.dao.repositories.AreaRepository;
import com.imrsac.dao.repositories.SoilRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.AreaRequestDto;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class AreaService {

    @Inject
    private AreaRepository areaRepository;

    @Inject
    private SoilRepository soilRepository;

    private static final Logger LOG = Logger.getLogger(AreaService.class);

    public List<AreaEntity> getAllAreas() throws IMRSACExeption {
        try {
            return this.areaRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_AREAS);
        }
    }

    public AreaEntity createArea(AreaEntity area, Long soilId) throws IMRSACExeption {
        try {
            this.areaRepository.persist(area);
            if (soilId != null) {
                SoilEntity soil = this.soilRepository.findById(soilId);
                area.setSoil(soil);
            }
            return area;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_AREA);
        }
    }

    public AreaEntity editArea(Long areadId, AreaRequestDto newData) throws IMRSACExeption {
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
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_AREA);
        }
    }

    public AreaEntity findAreaById(Long areaId) throws IMRSACExeption {
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
            AreaEntity area = this.areaRepository.findById(areaId);
            area.setSoil(null);
            return this.areaRepository.deleteById(areaId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_AREA);
        }
    }
}
