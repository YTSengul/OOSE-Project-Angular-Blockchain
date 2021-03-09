package nl.han.ica.oose.reims.services;

import nl.han.ica.oose.reims.mockDatabase;

import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;

public class Formulier {

    private final static String SOLIDITYVERSION = "pragma experimental ABIEncoderV2;\npragma solidity ^0.5.0;\n";
    public static final String MAINPATH = "C:/TruffleBlockchain/Blockchain";
    private String smartContractNaam;
    private ArrayList<Parameter> rootParameters;

    public Formulier() {}

    public Formulier(String naam, ArrayList<Parameter> rootParameters) {
        naam = naam.replace(" ","");
        this.smartContractNaam = naam;
        this.rootParameters = rootParameters;
    }

    public void controleerFormulier(mockDatabase database) {
        for (Parameter p : rootParameters) {
            p.controleerParameter(database);
        }
    }

    private String genereerSmartContractCode() {
        StringBuilder code = new StringBuilder(SOLIDITYVERSION + "\ncontract " + smartContractNaam + "" +
                " {string[] adviezen;\n" +
                "function returnAdviezen() public view returns (string[] memory) {\n" +
                "    return adviezen;\n" +
                "}\n" +
                "function checkContract(\n");

        for (Parameter p : rootParameters) {
            code = p.genereerParameterVariabelen(code);
        }

        code.setLength(code.length() - 2);
        code.append(") public {");

        for (Parameter p : rootParameters) {
            code = p.genereerParameterIfs(code);
        }

        code.append("\n}\n}");

        return code.toString();
    }

    public void genereerSmartContract() throws IOException {
        String code = genereerSmartContractCode();
        opslaanSmartContract(code);
        aanpassenDeployer();
    }

    private void opslaanSmartContract(String code) throws IOException {
        File smartContract = new File(MAINPATH + "contracts/" + smartContractNaam + ".sol");
        PrintWriter smartContractWriter = new PrintWriter(smartContract.getAbsolutePath());
        smartContractWriter.println(code);
        smartContractWriter.close();
    }


    private void aanpassenDeployer() throws FileNotFoundException {
        File deployer = new File(MAINPATH + "/migrations/2_deploy_contracts.js");

        StringBuilder oudeCode = leesBestand(deployer);

        String nieuweCode = null;
        if (oudeCode != null) {
            nieuweCode = oudeCode.toString().replace("contracts=[", "contracts=[artifacts.require(\"" + smartContractNaam + "\"),");
        }

        schrijfNieuweCode(deployer,nieuweCode);
    }

    private void schrijfNieuweCode(File deployer, String code) throws FileNotFoundException {
        PrintWriter deployerWriter = new PrintWriter(deployer.getAbsolutePath());
        deployerWriter.println(code);
        deployerWriter.close();
    }

    private StringBuilder leesBestand(File deployer) throws FileNotFoundException {
        Scanner deployerScanner = new Scanner(deployer);
        StringBuilder inhoud = new StringBuilder();

        while (deployerScanner.hasNext()) {
            inhoud.append(deployerScanner.next()).append("\n");
        }

        deployerScanner.close();

        return inhoud;
    }

    public void deploySmartContract() throws IOException {
        ProcessBuilder builder = new ProcessBuilder(
                "cmd.exe", "/c", "cd \"" + MAINPATH + "\" && truffle migrate --reset");
        builder.redirectErrorStream(true).start();
    }

    public void setSmartContractNaam(String smartContractNaam) {
        smartContractNaam = smartContractNaam.replace(" ","");
        this.smartContractNaam = smartContractNaam;
    }

    public String getSmartContractNaam() {
        return smartContractNaam;
    }

    public ArrayList<Parameter> getRootParameters() {
        return rootParameters;
    }

    public void setRootParameters(ArrayList<Parameter> rootParameters) {
        this.rootParameters = rootParameters;
    }

}
