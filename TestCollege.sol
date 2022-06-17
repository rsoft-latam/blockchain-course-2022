// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TestCollege {

    struct Note {
        uint id;
        string name;
        uint score;
        bool finalized;
        uint typeTest;
    }

    address private proffesorAddress;
    bool private revisionsClosed = false;

    event messageEvent(string name, string message);

    mapping(uint => Note) public listNotes;

    constructor() {
        proffesorAddress = msg.sender;
    }

    /**
     * @dev create new Note and add in listNotes
     * @param noteData new Note object
     */
    function createRevision(Note memory noteData) public onlyProffesor closedRevisions {
        require(bytes(noteData.name).length > 5, "The name of product should be more than.");
        listNotes[noteData.id] = Note(noteData.id, noteData.name, 0, false, 0);
    }

    /**
     * @dev Proffesor can finalize revision for one student
     * @param id of student, score of student
     */
    function finalizeReview(uint id, uint score) public payable closedRevisions onlyProffesor {
        require(listNotes[id].typeTest == 0, "Your test was reviewed.");
        listNotes[id].finalized = true;
        listNotes[id].typeTest = 1;
        listNotes[id].score = score;
        if (listNotes[id].score > 90) {
            listNotes[id].score = 100;
            emit messageEvent(listNotes[id].name, "Congratulations.");
        }
    }

    /**
     * @dev Student can request 2T test
     * @param id of student
     */
    function request2T(uint id) public payable closedRevisions {
        require(convertWeiToEther(msg.value) > 10, "The amount should be more than 10ETH.");
        Note memory noteData = listNotes[id];
        require(noteData.typeTest == 1 && !noteData.finalized, "Your test 1P was not reviewed.");
        listNotes[id].typeTest = 2;
        listNotes[id].score = 0;
        listNotes[id].finalized = false;
    }

    /**
     * @dev Proffesor can open and close revisions process
     * @param state of revisions process
     */
    function closeOrOpenRevisions(bool state) public onlyProffesor {
        revisionsClosed = state;
    }

    /**
     * @dev Proffesor can see total balance of college
     * @return balance of college
     */
    function balanceOfCollege() public view onlyProffesor returns (uint){
        return address(this).balance;
    }

    /**
     * @dev convert wei to ether
     * @param amountInWei value in wei to convert
     * @return param value in wei format
     */
    function convertWeiToEther(uint amountInWei) private pure returns (uint) {
        return amountInWei / 1 ether;
    }

    // Modifier to allow just proffesor can do something
    modifier onlyProffesor() {
        require(proffesorAddress == msg.sender, "You are not the owner.");
        _;
    }

    // Modifier to verify is revisions process is open or close
    modifier closedRevisions() {
        require(!revisionsClosed, "The revisions finalized.");
        _;
    }

}
