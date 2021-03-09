package nl.han.ica.oose.reims.services;

import nl.han.ica.oose.reims.mockDatabase;

import java.util.ArrayList;
import java.util.Arrays;

public class Parameter {
    public static final String VERKEERD_ONDERWERP_ERROR = "De mock database bevat het onderwerp niet!";
    public static final String VERKEERD_TYPE_ERROR = "De mock database bevat het type niet!";
    public static final String VERKEERDE_VERGELIJKER_ERROR = "De mock database bevat de vergelijker niet!";
    public static final String VERKEERDE_WAARDE_ERROR = "De waarde is in de min!";
    private String parameterNummer;
    private Onderwerp onderwerp;
    private ArrayList<Parameter> kinderen;
    private String vergelijker;
    private String adviesKleur;
    private int waarde;
    private ArrayList<Error> errors = new ArrayList<>();

    public Parameter() {
    }

    public Parameter(String adviesKleur, Onderwerp onderwerp, String vergelijker, int waarde, String parameterNummer) {
        this.adviesKleur = adviesKleur;
        this.onderwerp = onderwerp;
        this.vergelijker = vergelijker;
        this.waarde = waarde;
        this.parameterNummer = parameterNummer;
    }

    public Parameter(ArrayList<Parameter> kinderen, String adviesKleur, Onderwerp onderwerp, String vergelijker, int waarde, String parameterNummer) {
        this.kinderen = kinderen;
        this.adviesKleur = adviesKleur;
        this.onderwerp = onderwerp;
        this.vergelijker = vergelijker;
        this.waarde = waarde;
        this.parameterNummer = parameterNummer;
    }

    public StringBuilder genereerParameterIfs(StringBuilder code) {
        code.append("if (").append(onderwerp.getVolledigOnderwerp()).append(parameterNummer).append(" ")
                .append(vergelijker).append(" ").append(waarde).append(") { adviezen.push(").append("\"")
                .append(onderwerp.getVolledigOnderwerp()).append(parameterNummer).append(",")
                .append(adviesKleur).append("\");").append(" } \n");

        if (heeftKinderen()) {
            code.append("else { ");
            for (Parameter kind : kinderen) {
                code = kind.genereerParameterIfs(code);
            }
            code.append(" } \n");
        }

        if (!heeftKinderen()) {
            code.append("else { adviezen.push(\"").append(onderwerp.getVolledigOnderwerp()).append(parameterNummer).append(",rood\"); } \n");
        }


        return code;
    }

    public StringBuilder genereerParameterVariabelen(StringBuilder code) {
        code.append("int ").append(onderwerp.getVolledigOnderwerp()).append(parameterNummer).append(", ");

        if (heeftKinderen()) {
            for (Parameter kind : kinderen) {
                code = kind.genereerParameterVariabelen(code);
            }
        }

        return code;
    }

    public void controleerParameter(mockDatabase database) {
        voerControleUit(database);
        if (heeftKinderen()) {
            for (Parameter kids : kinderen) {
                kids.controleerParameter(database);
            }
        }
    }

    private void voerControleUit(mockDatabase database) {
        String[] mockDatabaseOnderwerpNaam = database.getOnderwerpNaam();
        String[] mockDatabaseOnderwerpType = database.getOnderwerpType();
        String[] mockDatabaseOnderwerpVergelijker = database.getVergelijkerVergelijker();

        if (!Arrays.asList(mockDatabaseOnderwerpNaam).contains(onderwerp.getNaam())) {
            Error error = new Error(VERKEERD_ONDERWERP_ERROR, "Naam");
            errors.add(error);
        }
        if (!Arrays.asList(mockDatabaseOnderwerpType).contains(onderwerp.getType())) {
            Error error = new Error(VERKEERD_TYPE_ERROR, "Type");
            errors.add(error);
        }
        if (!Arrays.asList(mockDatabaseOnderwerpVergelijker).contains(vergelijker)) {
            Error error = new Error(VERKEERDE_VERGELIJKER_ERROR, "Vergelijker");
            errors.add(error);
        }
        if (waarde < 0) {
            Error error = new Error(VERKEERDE_WAARDE_ERROR, "Waarde");
            errors.add(error);
        }

    }

    private boolean heeftKinderen() {
        if (kinderen != null) {
            return !kinderen.isEmpty();
        }
        return false;
    }

    public String getParameterNummer() {
        return parameterNummer;
    }

    public void setParameterNummer(String parameterNummer) {
        this.parameterNummer = parameterNummer;
    }

    public ArrayList<Parameter> getKinderen() {
        return kinderen;
    }

    public void setKinderen(ArrayList<Parameter> kinderen) {
        this.kinderen = kinderen;
    }

    public String getVergelijker() {
        return vergelijker;
    }

    public void setVergelijker(String vergelijker) {
        this.vergelijker = vergelijker;
    }

    public int getWaarde() {
        return waarde;
    }

    public void setWaarde(int waarde) {
        this.waarde = waarde;
    }

    public String getAdviesKleur() {
        return adviesKleur;
    }

    public void setAdviesKleur(String adviesKleur) {
        this.adviesKleur = adviesKleur;
    }

    public Onderwerp getOnderwerp() {
        return onderwerp;
    }

    public void setOnderwerp(Onderwerp onderwerp) {
        this.onderwerp = onderwerp;
    }

    public ArrayList<Error> getErrors() {
        return errors;
    }

    public void setErrors(ArrayList<Error> errors) {
        this.errors = errors;
    }

}
