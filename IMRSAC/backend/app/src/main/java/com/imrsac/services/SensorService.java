package com.imrsac.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.imrsac.dao.entities.SensorEntity;
import com.imrsac.dao.repositories.SensorRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.rest_client.ChirpstackDevice;
import com.imrsac.rest_client.ChirpstackDevicesService;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class SensorService {

    @Inject
    private SensorRepository sensorRepository;

    @RestClient
    private ChirpstackDevicesService chirpstackDevicesService;

    @ConfigProperty(name = "chirpstack.api.application-id")
    private Optional<String> lorawanServerApplicationId;

    @ConfigProperty(name = "chirpstack.api.device-profile-id")
    private Optional<String> lorawanServerDeviceProfileId;

    private static final Logger LOG = LoggerFactory.getLogger(SensorService.class);

    public List<SensorEntity> getAllSensors() throws IMRSACExeption {
        try {
            return this.sensorRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_SENSORS);
        }
    }

    public SensorEntity createSensor(SensorEntity sensorEntity) throws IMRSACExeption {
        try {
            ChirpstackDevice device = ChirpstackDevice.builder()
                    .applicationId(lorawanServerApplicationId.get())
                    .deviceProfileId(lorawanServerDeviceProfileId.get())
                    .devEui(sensorEntity.getDeviceEui())
                    .name(sensorEntity.getName())
                    .build();
       
            this.chirpstackDevicesService.createDevice(Map.of("device", device));
            this.sensorRepository.persist(sensorEntity);
            LOG.info("O sensor \"{}\" com DevEUI \"{}\" foi criado com sucesso", device.getName(), device.getDevEui());
            return sensorEntity;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_SENSOR);
        }
    }

    public SensorEntity findSensorById(String sensorEui) throws Exception {
        try {
            return this.sensorRepository.findByIdOptional(sensorEui)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.SENSOR_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public SensorEntity editSensor(SensorEntity sensor) throws IMRSACExeption {
        try {
            SensorEntity entity = this.sensorRepository.findById(sensor.getDeviceEui());
            entity.setLatitude(sensor.getLatitude());
            entity.setLongitude(sensor.getLongitude());
            ChirpstackDevice device = ChirpstackDevice.builder()
                    .applicationId(lorawanServerApplicationId.get())
                    .deviceProfileId(lorawanServerDeviceProfileId.get())
                    .devEui(entity.getDeviceEui())
                    .name(entity.getName())
                    .build();
            this.chirpstackDevicesService.updateDevice(sensor.getDeviceEui(), Map.of("device", device));
            LOG.info("O sensor \"{}\" com DevEUI \"{}\" foi atualizado com sucesso", device.getName(),
                    device.getDevEui());
            return entity;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_SENSOR);
        }
    }

    public boolean deleteSensor(String sensorEui) throws IMRSACExeption {
        try {
            SensorEntity sensor = this.sensorRepository.findById(sensorEui);
            sensor.setPlantation(null);
            this.chirpstackDevicesService.deleteDevice(sensorEui);
            LOG.info("Sensor \"{}\" com DevEUI \"{}\" foi removido com sucesso", sensor.getName(), sensorEui);
            return this.sensorRepository.deleteById(sensorEui);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_SENSOR);
        }
    }

}
