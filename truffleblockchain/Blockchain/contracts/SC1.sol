pragma experimental ABIEncoderV2;
pragma solidity ^0.5.0;

contract SC1 {string[] adviezen;
function returnAdviezen() public view returns (string[] memory) {
    return adviezen;
}
function checkContract(
int StationAfstand1) public {if (StationAfstand1 > 35) { adviezen.push("StationAfstand1,null"); } 
else { adviezen.push("StationAfstand1,rood"); } 

}
}
