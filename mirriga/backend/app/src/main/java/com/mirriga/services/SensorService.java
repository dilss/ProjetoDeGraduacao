package com.mirriga.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mirriga.dao.entities.PlantationEntity;
import com.mirriga.dao.entities.SensorEntity;
import com.mirriga.dao.repositories.PlantationRepository;
import com.mirriga.dao.repositories.SensorRepository;
import com.mirriga.exceptions.MirrigaErrorEnum;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.SensorRequestDto;
import com.mirriga.rest_client.ChirpstackDevice;
import com.mirriga.rest_client.ChirpstackDeviceKeys;
import com.mirriga.rest_client.ChirpstackDevicesService;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class SensorService {

    @Inject
    private SensorRepository sensorRepository;

    @Inject
    private PlantationRepository plantationRepository;

    @RestClient
    private ChirpstackDevicesService chirpstackDevicesService;

    @ConfigProperty(name = "chirpstack.api.application-id")
    private Optional<String> lorawanServerApplicationId;

    @ConfigProperty(name = "chirpstack.api.device-profile-id")
    private Optional<String> lorawanServerDeviceProfileId;

    private static final Logger LOG = LoggerFactory.getLogger(SensorService.class);

    public List<SensorEntity> getAllSensors() throws MirrigaException {
        try {
            return this.sensorRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_FETCHING_SENSORS);
        }
    }

    public SensorEntity createSensor(SensorRequestDto request) throws MirrigaException {
        SensorEntity sensorEntity = SensorEntity.builder()
                .deviceEui(request.getDeviceEui())
                .name(request.getName())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();

        try {
            ChirpstackDevice device = ChirpstackDevice.builder()
                    .applicationId(lorawanServerApplicationId.get())
                    .deviceProfileId(lorawanServerDeviceProfileId.get())
                    .devEui(sensorEntity.getDeviceEui())
                    .name(sensorEntity.getName())
                    .build();

            PlantationEntity plantationEntity = this.plantationRepository.findById(request.getPlantationId());
            sensorEntity.setPlantation(plantationEntity);
            this.chirpstackDevicesService.createDevice(Map.of("device", device));
            this.sensorRepository.persist(sensorEntity);
            LOG.info("O sensor \"{}\" com DevEUI \"{}\" foi criado com sucesso", device.getName(), device.getDevEui());
            return sensorEntity;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_PERSISTING_SENSOR);
        }
    }

    public SensorEntity findSensorById(String sensorEui) throws Exception {
        try {
            return this.sensorRepository.findByIdOptional(sensorEui)
                    .orElseThrow(() -> new MirrigaException(MirrigaErrorEnum.SENSOR_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public SensorEntity editSensor(SensorRequestDto request) throws MirrigaException {
        try {
            SensorEntity entity = this.sensorRepository.findById(request.getDeviceEui());
            entity.setLatitude(request.getLatitude());
            entity.setLongitude(request.getLongitude());
            entity.setName(request.getName());
            ChirpstackDevice device = ChirpstackDevice.builder()
                    .applicationId(lorawanServerApplicationId.get())
                    .deviceProfileId(lorawanServerDeviceProfileId.get())
                    .devEui(entity.getDeviceEui())
                    .name(entity.getName())
                    .build();
            this.chirpstackDevicesService.updateDevice(request.getDeviceEui(), Map.of("device", device));
            LOG.info("O sensor \"{}\" com DevEUI \"{}\" foi atualizado com sucesso", device.getName(),
                    device.getDevEui());
            return entity;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_UPDATING_SENSOR);
        }
    }

    public boolean deleteSensor(String sensorEui) throws MirrigaException {
        try {
            SensorEntity sensor = this.sensorRepository.findById(sensorEui);
            sensor.setPlantation(null);
            this.chirpstackDevicesService.deleteDevice(sensorEui);
            LOG.info("Sensor \"{}\" com DevEUI \"{}\" foi removido com sucesso", sensor.getName(), sensorEui);
            return this.sensorRepository.deleteById(sensorEui);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_REMOVING_SENSOR);
        }
    }

    public ChirpstackDeviceKeys getSensorKeys(String sensorEui) throws MirrigaException {
        try {
            return this.chirpstackDevicesService.getDeviceKeys(sensorEui);
        } catch (RuntimeException e) {
            return ChirpstackDeviceKeys.builder().deviceKeys(null).build();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_FETCHING_SENSOR_KEYS);
        }
    }

    public boolean addNetworkKeyToSensor(String sensorEui, String sensorNetworkKey) throws MirrigaException {
        try {
            SensorEntity sensorEntity = this.sensorRepository.findById(sensorEui);
            sensorEntity.setNetworkKey(sensorNetworkKey);
            this.chirpstackDevicesService.addNetworkKeyToDevice(sensorEui,
                    Map.of("deviceKeys", Map.of("nwkKey", sensorNetworkKey)));
            return true;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_ADDING_SENSOR_NETWORK_KEY);

        }
    }

    public boolean editSensorNetworkKey(String sensorEui, String sensorNetworkKey) throws MirrigaException {
        try {
            SensorEntity sensorEntity = this.sensorRepository.findById(sensorEui);
            sensorEntity.setNetworkKey(sensorNetworkKey);
            this.chirpstackDevicesService.updateDeviceNetworkKey(sensorEui,
                    Map.of("deviceKeys", Map.of("nwkKey", sensorNetworkKey)));
            return true;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_UPDATING_SENSOR_NETWORK_KEY);

        }
    }
}
