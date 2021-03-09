package nl.han.ica.oose.reims;

public class mockDatabase {

    private String[] onderwerpNaam = {"Boom", "Station", "Gevel", "Afdak"};
    private String[] onderwerpType = {"Hoogte", "Afstand", "Breedte", "Leeftijd"};
    private String[] onderwerpVergelijker = {"<", ">"};

    public String[] getOnderwerpNaam() {
        return onderwerpNaam;
    }

    public String[] getOnderwerpType() {
        return onderwerpType;
    }

    public String[] getVergelijkerVergelijker() {
        return onderwerpVergelijker;
    }

}
