package com.mirriga.rest_client;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChirpstackDeviceKeys implements Serializable {
    private Keys deviceKeys;

    @Getter
    @NoArgsConstructor
    class Keys implements Serializable {
        private String devEui;
        private String appKey;
        private String nwkKey;
    }
}
