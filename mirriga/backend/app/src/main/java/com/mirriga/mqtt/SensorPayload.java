package com.mirriga.mqtt;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.OffsetDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public final class SensorPayload {
    private String deduplicationId;
    private OffsetDateTime time;
    private DeviceInfo deviceInfo;
    private String devAddr;
    private boolean adr;
    private Integer dr;
    private Integer fCnt;
    private Integer fPort;
    private boolean confirmed;
    private String data;
    private List<ReceiverInfo> rxInfo;
    private TransmitterInfo txInfo;
}

@Getter
@ToString
@JsonIgnoreProperties({"tags"})
final class DeviceInfo {
    private String tenantId;
    private String tenantName;
    private String applicationId;
    private String applicationName;
    private String deviceProfileId;
    private String deviceProfileName;
    private String deviceName;
    private String devEui;
    private String deviceClassEnabled;
    // private Object tags;
}

@Getter
@ToString
final class ReceiverInfo {
    private String gatewayId;
    private BigInteger uplinkId;
    private OffsetDateTime gwTime;
    private OffsetDateTime nsTime;
    private String timeSinceGpsEpoch;
    private Integer rssi;
    private Double snr;
    private Location location;
    private String context;
    private Region metadata;
    private String crcStatus;
}

@Getter
@ToString
final class Location {
    private BigDecimal latitude;
    private BigDecimal longitude;
    private BigDecimal altitude;
}

@Getter
@ToString
final class Region {
    @JsonProperty("region_config_id")
    private String regionConfigId;

    @JsonProperty("region_common_name")
    private String regionCommonName;
}

@Getter
@ToString
final class TransmitterInfo {
    private BigInteger frequency;
    private ModulationInfo modulation;
}

@Getter
@ToString
final class ModulationInfo {
    private LoraModulationInfo lora;
}

@Getter
@ToString
final class LoraModulationInfo {
    private BigInteger bandwidth;
    private Integer spreadingFactor;
    private String codeRate;
}