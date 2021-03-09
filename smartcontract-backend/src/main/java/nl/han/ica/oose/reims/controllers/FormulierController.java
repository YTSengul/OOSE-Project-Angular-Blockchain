package nl.han.ica.oose.reims.controllers;

import nl.han.ica.oose.reims.mockDatabase;
import nl.han.ica.oose.reims.services.Formulier;
import nl.han.ica.oose.reims.services.Parameter;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("")
public class FormulierController {

    @Path("/smartcontracts")
    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response verwerkSmartContract(Formulier formulier) {
        mockDatabase mockDatabase = new mockDatabase();

        formulier.controleerFormulier(mockDatabase);

        for (Parameter param: formulier.getRootParameters()) {
            if (param.getErrors() != null) {
                if(!param.getErrors().isEmpty()){
                    return Response.status(400).entity(formulier).build();
                }
            }
        }

        try {
            formulier.genereerSmartContract();
            formulier.deploySmartContract();
        } catch (IOException e) {
            return Response.status(500).build();
        }


        return Response.status(201).build();
    }
}
