<?php
include("header.html");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home pagina</title>
    <link href="homepagina.css" rel="stylesheet">
</head>
<body>
<div class="page-content container col-md-10">
    <div class="page-item">
        <button class="btn btn-lg btn-contract-aanmaken">Contract aanmaken</button>
    </div>
    <div class="page-item">
        <h1>Overzicht met huidige smartcontracts.</h1>
    </div>
    <div class="smartcontracts">
        <div class="smartcontract-box">
            <div class="smartcontract">
                <div class="col-sm-3 item">
                    <a><h3>Smart contract</h3></a>
                </div>
                <div class="col-sm-2 item item-right">
                    <a><h3>Wijzigen</h3></a>
                </div>
                <div class="col-sm-2 item">
                    <a><h3>Verwijderen</h3></a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>