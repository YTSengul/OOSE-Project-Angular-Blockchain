package nl.han.ica.oose.reims.services;

import nl.han.ica.oose.reims.mockDatabase;
import org.junit.Test;
import org.mockito.Mockito;

import java.io.IOException;
import java.util.ArrayList;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class FormulierTest {
    private Formulier formulier = new Formulier("", null);

    @Test
    public void succesvolGenereerSmartContract() throws IOException {
        Parameter mockParameter = Mockito.mock(Parameter.class);
        Mockito.when(mockParameter.genereerParameterVariabelen(Mockito.any(StringBuilder.class))).thenReturn(new StringBuilder("string"));
        Mockito.when(mockParameter.genereerParameterIfs(Mockito.any(StringBuilder.class))).thenReturn(new StringBuilder("string"));
        ArrayList<Parameter> parameters = new ArrayList<>();
        parameters.add(mockParameter);
        formulier.setRootParameters(parameters);

        formulier.genereerSmartContract();
    }

    @Test(expected = NullPointerException.class)
    public void nietSuccesvolGenereerSmartContract() throws IOException {
        formulier.genereerSmartContract();
    }

    @Test
    public void succesvolDeploySmartContract() throws IOException {
        formulier.deploySmartContract();
    }

    @Test
    public void wordtFormulierGecontrolleerd(){
        mockDatabase database = new mockDatabase();
        Parameter mockParam = mock(Parameter.class);
        ArrayList<Parameter> parameters = new ArrayList<>();
        parameters.add(mockParam);

        formulier.setRootParameters(parameters);
        formulier.controleerFormulier(database);

        verify(mockParam).controleerParameter(database);
    }
}
