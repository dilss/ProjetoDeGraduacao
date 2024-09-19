package com.mirriga.rest_client;

import java.util.Map;

import org.eclipse.microprofile.rest.client.annotation.ClientHeaderParam;
import org.eclipse.microprofile.rest.client.annotation.RegisterProvider;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;

@Path("/devices")
@RegisterRestClient(configKey = "chirpstack-api-devices")
@RegisterProvider(ChirpstackResponseExceptionMapper.class)
@ClientHeaderParam(name = "Grpc-Metadata-Authorization", value = "Bearer ${chirpstack.api-key}")
public interface ChirpstackDevicesService {

    @POST
    public void createDevice(Map<String, ChirpstackDevice> requestBody);

    @GET
    @Path("{deviceEui}")
    public ChirpstackDevice getDevice(String deviceEui);

    @PUT
    @Path("{deviceEui}")
    public void updateDevice(String deviceEui, Map<String, ChirpstackDevice> requestBody);

    @DELETE
    @Path("{deviceEui}")
    public void deleteDevice(String deviceEui);

    @GET
    @Path("{deviceEui}/keys")
    public ChirpstackDeviceKeys getDeviceKeys(String deviceEui);

    @POST
    @Path("{deviceEui}/keys")
    public void addNetworkKeyToDevice(String deviceEui, Map<String, Map<String, String>> requestBody);

    @PUT
    @Path("{deviceEui}/keys")
    public void updateDeviceNetworkKey(String deviceEui, Map<String, Map<String, String>> requestBody);
}
