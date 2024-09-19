package com.mirriga.rest_client;

import java.io.Serializable;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class ChirpstackDevice implements Serializable {
    private String applicationId;
    private String description;
    private String devEui;
    private String deviceProfileId;

    @Builder.Default
    private boolean isDisabled = false;
    private String joinEui;
    private String name;

    @Builder.Default
    private boolean skipFcntCheck = true;
    private AditionalProperties tags;
    private AditionalProperties variables;

    @Getter
    @Setter
    class AditionalProperties implements Serializable {
        private String additionalProp1;
        private String additionalProp2;
        private String additionalProp3;
    }
}
