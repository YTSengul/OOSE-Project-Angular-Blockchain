package nl.han.ica.oose.reims.services;

import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class OnderwerpTest {

    @Test
    public void heeftVolledigOnderwerp(){
        Onderwerp onderwerp = new Onderwerp("Naam", "Onderwerp");

        assertEquals(onderwerp.getNaam() + onderwerp.getType(), onderwerp.getVolledigOnderwerp());
    }
}
