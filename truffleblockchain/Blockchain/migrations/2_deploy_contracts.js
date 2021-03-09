const
contracts=[artifacts.require("SC1"),artifacts.require(""),artifacts.require(""),artifacts.require(""),artifacts.require(""),artifacts.require("SC7"),artifacts.require("SC6"),artifacts.require("SC6")];
module.exports=function(deployer){
for
(var
i=0;i<contracts.length;i++)
{
deployer.deploy(contracts[i]);
}
};

