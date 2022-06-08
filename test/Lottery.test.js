const Lottery = artifacts.require("Lottery");

contract("Lottery", accounts=> {

    it("allows one account to enter", async ()=> {
        const instance = await Lottery.deployed();
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[1], players[0])
        assert.equal(1, players.length)
    })

})
