package nl.han.ica.oose.reims.services;

public class Error {

    private String errorBericht;
    private String errorPlaats;

    public Error() {}

    public Error(String errorBericht, String errorPlaats){
        this.errorBericht = errorBericht;
        this.errorPlaats = errorPlaats;
    }

    public String getErrorBericht() {
        return errorBericht;
    }

    public void setErrorBericht(String errorBericht) {
        this.errorBericht = errorBericht;
    }

    public String getErrorPlaats() {
        return errorPlaats;
    }

    public void setErrorPlaats(String errorPlaats) {
        this.errorPlaats = errorPlaats;
    }

}
