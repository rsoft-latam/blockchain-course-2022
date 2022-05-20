// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

contract Inbox {

    string public message;

    constructor() {
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

}
