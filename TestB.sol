// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

// BANK

contract TestB {

    address private owner;
    bool private closed = false;
    event clientDeposit(uint id, string name, uint amount);

    struct Account {
        uint id;
        string name;
        uint balance;
        bool enable;
    }

    mapping(uint => Account) public listAccounts;

    constructor() {
        owner = msg.sender;
    }

    function createAccount(Account memory accountData) public onlyOwner(msg.sender) closedBank {
        require(bytes(accountData.name).length > 5, "the name of product should be more than 5.");
        listAccounts[accountData.id] = Account(accountData.id, accountData.name, 0, true);
    }

    function depositMoney(uint id) public payable closedBank {
        Account memory accountData = listAccounts[id];
        require(!accountData.enable, "your account is blocked.");
        uint amount = convertWeiToEther(msg.value);
        require(amount > 2, "the minimun deposit should be more than 2 ETH.");
        listAccounts[id].balance += amount;
        emit clientDeposit(accountData.id , accountData.name, amount);
        if(amount > 10) {
            payable(msg.sender).transfer(2);
        }
    }

    function redrawMoney(uint id, uint amount) public payable closedBank {
        Account memory accountData = listAccounts[id];
        require(!accountData.enable, "your account is blocked.");
        require(amount <= accountData.balance, "you don't have enough money in your account to redraw.");
        listAccounts[id].balance -= amount;
        payable(msg.sender).transfer(amount);
    }

    function blockAccount(uint id) public onlyOwner(msg.sender) closedBank {
        listAccounts[id].enable = false;
    }


    function closeOrOpenBank(bool value) public onlyOwner(msg.sender) {
        closed = value;
    }

    function withdrawAllMoney() public onlyOwner(msg.sender) {
        payable(msg.sender).transfer(address(this).balance);
    }

    modifier onlyOwner(address wallet) {
        require(owner == wallet, "you are not the owner.");
        _;
    }

    modifier closedBank() {
        require(!closed, "the bank is closed.");
        _;
    }

    function convertWeiToEther(uint amountInWei) private pure returns(uint) {
        return amountInWei / 1 ether;
    }

}
