// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TestBank {

    struct Account {
        uint id;
        string name;
        uint balance;
        bool enable;
    }

    address private ownerAddress;
    bool private bankClosed = false;

    event clientDeposit(uint id, string name, uint amount);

    mapping(uint => Account) public listAccounts;

    constructor() {
        ownerAddress = msg.sender;
    }

    /**
     * @dev create account of client for bank
     * @param accountData data of new account
     */
    function createAccount(Account memory accountData) public onlyOwner closedBank {
        require(bytes(accountData.name).length > 5, "The name of account should be more than 5.");
        listAccounts[accountData.id] = Account(accountData.id, accountData.name, 0, true);
    }

    /**
     * @dev allow to user deposit money to his account
     * @param id of account
     */
    function depositMoney(uint id) public payable closedBank {
        Account memory accountData = listAccounts[id];
        require(accountData.enable, "Your account is blocked.");
        uint amount = convertWeiToEther(msg.value);
        require(amount > 2, "The minimun deposit should be more than 2 ETH.");
        listAccounts[id].balance += amount;
        emit clientDeposit(accountData.id, accountData.name, amount);
        if (amount > 10) {
            payable(msg.sender).transfer(convertEtherToWei(2));
        }
    }

    /**
     * @dev allow to user withdraw his money of his account
     * @param id of account, amount to withdraw
     */
    function redrawMoney(uint id, uint amount) public payable closedBank {
        Account memory accountData = listAccounts[id];
        require(accountData.enable, "Your account is blocked.");
        require(amount <= accountData.balance, "You don't have enough money in your account to redraw.");
        listAccounts[id].balance -= amount;
        payable(msg.sender).transfer(convertEtherToWei(amount));
    }

    /**
     * @dev Manager of bank can lock one specific account
     * @param id of account to lock
     */
    function blockAccount(uint id) public onlyOwner closedBank {
        listAccounts[id].enable = false;
    }

    /**
     * @dev Manager can open or close bank
     * @param state true or false
     */
    function closeOrOpenBank(bool state) public onlyOwner {
        bankClosed = state;
    }

    /**
     * @dev Manager can withdraw all money of the bank
     */
    function withdrawAllMoney() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * @dev convert wei to ether
     * @param amountInWei value in wei to convert
     * @return param value in ether format
     */
    function convertWeiToEther(uint amountInWei) private pure returns (uint) {
        return amountInWei / 1 ether;
    }

    /**
     * @dev convert ether to wei
     * @param amountInEther value in ether to convert
     * @return param value in wei format
     */
    function convertEtherToWei(uint amountInEther) private pure returns (uint) {
        return amountInEther * 1 ether;
    }

    // Modifier to allow just manager to do something
    modifier onlyOwner() {
        require(ownerAddress == msg.sender, "You are not the owner.");
        _;
    }

    // Modifier to verify if bank is close or open
    modifier closedBank() {
        require(!bankClosed, "The bank is closed.");
        _;
    }

}
