package nl.han.ica.oose.reims.services;

public class Onderwerp {

    private String naam;
    private String type;

    public Onderwerp() {}

    public Onderwerp(String naam, String type) {
        this.naam = naam;
        this.type = type;
    }

    public String getVolledigOnderwerp() {
        return naam + type;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
