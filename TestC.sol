// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

// COLLEGE

contract TestC {

    address private owner;
    bool private closed = false;
    event messageEvent(string name, string message);

    struct Note {
        uint id;
        string name;
        uint score;
        bool finalized;
        uint typeTest;
    }

    mapping(uint => Note) public listNotes;

    constructor() {
        owner = msg.sender;
    }

    function createRevision(Note memory noteData) public onlyOwner(msg.sender) closedRevisions {
        require(bytes(noteData.name).length > 5, "the name of product should be more than.");
        listNotes[noteData.id] = Note(noteData.id, noteData.name, 0, false, 0);
    }

    function finalizeReview(uint id, uint score) public payable closedRevisions onlyOwner(msg.sender) {
        require(listNotes[id].typeTest == 0, "your test was reviewed.");
        listNotes[id].finalized = true;
        listNotes[id].typeTest = 1;
        listNotes[id].score = score;

        if(listNotes[id].score > 90) {
            listNotes[id].score = 100;
            emit messageEvent(listNotes[id].name, "Congratulations");
        }
    }

    function request2T(uint id) public payable closedRevisions {
        require(convertWeiToEther(msg.value) > 10, "the amount should be more than 10ETH.");
        Note memory noteData = listNotes[id];
        require(noteData.typeTest == 1 && !noteData.finalized, "your test 1P was not reviewed.");
        listNotes[id].typeTest = 2;
        listNotes[id].score = 0;
        listNotes[id].finalized = false;
    }

    function closeOrOpenRevisions(bool value) public onlyOwner(msg.sender) {
        closed = value;
    }

    function balanceOfCollege() public view onlyOwner(msg.sender) returns(uint){
        return address(this).balance;
    }

    modifier onlyOwner(address wallet) {
        require(owner == wallet, "you are not the owner.");
        _;
    }

    modifier closedRevisions() {
        require(!closed, "the revisions finalized.");
        _;
    }

    function convertWeiToEther(uint amountInWei) private pure returns(uint) {
        return amountInWei / 1 ether;
    }

}
