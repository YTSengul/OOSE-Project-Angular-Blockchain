package nl.han.ica.oose.reims.services;

import nl.han.ica.oose.reims.mockDatabase;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.ArrayList;


import static org.junit.Assert.*;
import static org.mockito.Mockito.verify;

public class ParameterTest {

    private Parameter sut;
    private Parameter parameterMock;
    private mockDatabase database;
    private StringBuilder code;
    private ArrayList<Parameter> kinderen;
    private Onderwerp onderwerp;

    @Before
    public void parameterTestSetup() {
        parameterMock = Mockito.mock(Parameter.class);
        database = new mockDatabase();
        code = new StringBuilder();
        kinderen = new ArrayList<>();
        onderwerp = new Onderwerp("boom", "hoogte");
    }

    @Test
    public void checkOfControleerParameterControleUitvoertVanParameterInKind() {
        sut = new Parameter(null, "Oranje", new Onderwerp("Gevel", "Breedte"), ">", 6, "1");
        ArrayList<Parameter> parameters = new ArrayList<>();

        parameters.add(parameterMock);
        sut.setKinderen(parameters);
        sut.controleerParameter(database);

        verify(parameterMock).controleerParameter(database);
    }


    @Test
    public void checkOfGenereerParameterVariabelenDoorgaatNaarMethodeInKinderen() {
        sut = new Parameter(null, "Oranje", new Onderwerp("Gevel", "Breedte"), ">", 6, "1");
        StringBuilder code = new StringBuilder();

        ArrayList<Parameter> parameters = new ArrayList<>();
        parameters.add(parameterMock);
        sut.setKinderen(parameters);

        sut.genereerParameterVariabelen(code);

        verify(parameterMock).genereerParameterVariabelen(code);
    }

    @Test
    public void checkOfGenereerParameterVariabelenNietDoorgaatNaarMethodeInKinderenOmdatKinderenNullIsEnDaaromDezelfdeCodeTerugGeeft() {
        sut = new Parameter(null, "Oranje", new Onderwerp("Gevel", "Breedte"), ">", 6, "1");
        String expected = "int GevelBreedte1, ";
        StringBuilder code = new StringBuilder();

        String result = sut.genereerParameterVariabelen(code).toString();

        assertEquals(expected, result);
    }

    @Test(expected = NullPointerException.class)
    public void nietSuccesvolGenereerParametersIfNullpointer() {
        sut = new Parameter();
        kinderen.add(parameterMock);
        sut.setKinderen(kinderen);
        sut.genereerParameterIfs(code);
    }

    @Test
    public void succesvolGenereerParametersIfGeenKinderen() {
        sut = new Parameter("groen", onderwerp, "<", 5, "1");
        String expected = "if (boomhoogte1 < 5) { adviezen.push(\"boomhoogte1,groen\"); } \n" +
                "else { adviezen.push(\"boomhoogte1,rood\"); } \n";

        sut.genereerParameterIfs(code);

        String result = code.toString();

        Assert.assertEquals(expected, result);
    }

    @Test
    public void succesvolGenereerParametersIfMetKinder() {
        kinderen.add(parameterMock);
        sut = new Parameter(kinderen, "groen", onderwerp, "<", 5, "1");
        String expected = "if (boomhoogte1 < 5) { adviezen.push(\"boomhoogte1,groen\"); } \n" +
                "else {  } \n";

        Mockito.when(parameterMock.genereerParameterIfs(code)).thenReturn(code);

        sut.genereerParameterIfs(code);

        String result = code.toString();

        Assert.assertEquals(expected, result);
    }

    @Test
    public void checkOfControleerParameterDeJuisteFoutTerugGeeftBijFouteNaam() {
        Parameter parameter = new Parameter(null, "Oranje", new Onderwerp("Revel", "Breedte"), ">", 6, "3");
        parameter.controleerParameter(database);

        String[] errorCheck = {"De mock database bevat het onderwerp niet!", "Naam"};
        String[] errorOmTeChecken = {parameter.getErrors().get(0).getErrorBericht(), parameter.getErrors().get(0).getErrorPlaats()};

        assertArrayEquals(errorCheck, errorOmTeChecken);
    }

    @Test
    public void checkOfControleerParameterDeJuisteFoutTerugGeeftBijFouteOnderwerp() {
        Parameter parameter = new Parameter(null, "Oranje", new Onderwerp("Gevel", "breedte"), ">", 6, "3");
        parameter.controleerParameter(database);

        String[] errorCheck = {"De mock database bevat het type niet!", "Type"};
        String[] errorOmTeChecken = {parameter.getErrors().get(0).getErrorBericht(), parameter.getErrors().get(0).getErrorPlaats()};

        assertArrayEquals(errorCheck, errorOmTeChecken);
    }

    @Test
    public void checkOfControleerParameterDeJuisteFoutTerugGeeftBijFouteVergelijker() {
        Parameter parameter = new Parameter(null, "Oranje", new Onderwerp("Gevel", "Breedte"), "?", 6, "3");
        parameter.controleerParameter(database);

        String[] errorCheck = {"De mock database bevat de vergelijker niet!", "Vergelijker"};
        String[] errorOmTeChecken = {parameter.getErrors().get(0).getErrorBericht(), parameter.getErrors().get(0).getErrorPlaats()};

        assertArrayEquals(errorCheck, errorOmTeChecken);
    }

    @Test
    public void checkOfControleerParameterDeJuisteFoutTerugGeeftBijWaardeInDeMin() {
        Parameter parameter = new Parameter(null, "Oranje", new Onderwerp("Gevel", "Breedte"), ">", -6, "3");
        parameter.controleerParameter(database);

        String[] errorCheck = {"De waarde is in de min!", "Waarde"};
        String[] errorOmTeChecken = {parameter.getErrors().get(0).getErrorBericht(), parameter.getErrors().get(0).getErrorPlaats()};

        assertArrayEquals(errorCheck, errorOmTeChecken);
    }

    @Test
    public void succesvolControleerParameter() {
        Parameter parameter = new Parameter(null, "Oranje", new Onderwerp("Gevel", "Breedte"), ">", 6, "3");
        parameter.controleerParameter(database);

        ArrayList<Error> result = parameter.getErrors();

        assertTrue(result.isEmpty());
    }
}
