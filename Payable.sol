// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

contract ModifierExample {

    bool public myBolean;
    string public myString;
    uint public myNumber;
    mapping(uint => bool) public myMapping;


    mapping(address => uint) public myAdrresses;

    function receiveMoney() public payable {
        myAdrresses[msg.sender] += msg.value;
    }

    function withdrawMoney(uint amount) public {

        require((amount * ( 10**18)) <= myAdrresses[msg.sender], "not enought money to wittdraw.");
        myAdrresses[msg.sender] -= amount * ( 10**18);
        address myWallet = msg.sender;
        payable(myWallet).transfer(amount * ( 10**18));


        //if(amount * ( 10**18) <= myAdrresses[msg.sender]){
        //   myAdrresses[msg.sender] -= amount * ( 10**18);
        //   address myWallet = msg.sender;
        //   payable(myWallet).transfer(amount * ( 10**18));
        //}
    }

    function setValue(uint index, bool value) public {
        myMapping[index] = value;
    }

    function setMyAdrresses(address wallet, uint amount) public {
        myAdrresses[wallet] = amount;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }


}
