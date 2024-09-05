package com.imrsac.rest_client;

import java.util.Map;

import org.eclipse.microprofile.rest.client.annotation.ClientHeaderParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;

@Path("/devices")
@RegisterRestClient(configKey = "chirpstack-api-devices")
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
}
