const Lottery = artifacts.require("Lottery");

contract("Lottery", accounts=> {
    let instance;
    beforeEach("deploys a contract", async () => {
        instance = await Lottery.new();
    })

    it("allows one account to enter", async ()=> {
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[1], players[0])
        assert.equal(1, players.length)
    })

    it("allows multiple account to enter", async ()=> {
        await instance.enter({from: accounts[0], value: web3.utils.toWei("3", "ether")})
        await instance.enter({from: accounts[1], value: web3.utils.toWei("4", "ether")})
        await instance.enter({from: accounts[2], value: web3.utils.toWei("5", "ether")})

        const players = await instance.getPlayers.call()

        assert.equal(accounts[0], players[0])
        assert.equal(accounts[1], players[1])
        assert.equal(accounts[2], players[2])
        assert.equal(3, players.length);
    })

    it("require a minimum amount of ether to enter", async ()=> {
        try {
            await instance.enter({from: accounts[1], value: web3.utils.toWei("1", "ether")})
            assert(false)
        } catch (e) {
            assert.equal("Minimum 2.1 Ether", e.reason)
        }
    })

    it("only manager cal call pickWinner", async ()=>{
        try {
            await instance.pickWinner({from: accounts[8]});
            assert(false)
        } catch (e) {
            assert.equal("you are not the manager.", e.reason)
        }
    })

    it("sends money to the winner and resets the players array", async () => {

       const  initialBalancePlayer = await web3.eth.getBalance(accounts[1])
       await instance.enter({from: accounts[1], value: web3.utils.toWei("5", "ether")});
       const  initialBalanceLottery = await web3.eth.getBalance(instance.address)

       await instance.pickWinner({from: accounts[0]});

       const finalBalancePlayer = await web3.eth.getBalance(accounts[1])

       const difference = finalBalancePlayer - initialBalanceLottery;
       assert(difference > web3.utils.toWei("4.7", "ether"))

    })

    //pensando en participar   player 2.2 ETH       lottery 0.0 ETH
    //apuesta                  player 0 ETH         lottery 2.1 ETH
    //se hace el sorteo        player 2.0 ETH       lottery 0 ETH

    //pensando en participar   player 100 ETH       lottery 0 ETH
    //apuesta                  player 5 ETH         lottery 4.8  ETH
    //se hace el sorteo        player 99.8 ETH       lottery 0 ETH


})
