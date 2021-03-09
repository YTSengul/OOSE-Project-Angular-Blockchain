pragma experimental ABIEncoderV2;
pragma solidity ^0.5.0;

contract SC6 {string[] adviezen;
function returnAdviezen() public view returns (string[] memory) {
    return adviezen;
}
function checkContract(
int BoomAfstand1, int StationAfstand1_1) public {if (BoomAfstand1 < 24) { adviezen.push("BoomAfstand1,groen"); } 
else { if (StationAfstand1_1 < 65) { adviezen.push("StationAfstand1_1,rood"); } 
else { adviezen.push("StationAfstand1_1,rood"); } 
 } 

}
}
