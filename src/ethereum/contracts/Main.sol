// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract Main {

    ERC20 private _token;
    address private owner;
    address private contractAddress;

    constructor(){
        _token = new ERC20("UPC Coin","UPB");
        owner = msg.sender;
        contractAddress = address(this);
    }

    function priceTokens(uint256 numTokens) public returns(uint256) {
        return numTokens * 1 ether;
    }

    function buyTokens(address client, uint256 amount) public payable {
        uint256 price = priceTokens(amount);
        require(msg.value >= price, "buy more tokens");
        uint256 returnValue = msg.value - price;
        payable(msg.sender).transfer(returnValue);
        _token.transfer(client, amount);
    }

    function generetaTokens(uint256 amount) public {
        _token.increaseTotalSupply(contractAddress, amount);
    }

    function getContractAddress() public view returns(address) {
        return contractAddress;
    }

    function balanceAccount(address account) public view returns(uint256) {
        return _token.balanceOf(account);
    }

    function getTotalSupply() public view returns(uint256) {
        return _token.totalSupply();
    }

}
