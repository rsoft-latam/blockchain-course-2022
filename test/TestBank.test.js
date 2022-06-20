const TestBank = artifacts.require("TestBank");

const weiToEther = (wei) => {
    const ether = web3.utils.fromWei(wei, 'ether');
    return parseInt(ether);
}

contract("TestBank", (accounts) => {

    let instance;
    const newAccount = {id: 1, name: "Juan Perez", balance: 0, enable: true};

    beforeEach("deploys a contract", async () => {
        instance = await TestBank.new();
    });

    it("1.- Realizar el testing solo el dueño del banco puede crear una cuenta con un balance inicial de cero y cuenta " +
        "desbloqueada controlar internamente", async () => {
        await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
        const account = await instance.listAccounts.call(newAccount.id);
        assert.equal(account.id, newAccount.id);
        assert.equal(account.name, newAccount.name);
        assert.equal(account.balance, 0);
        assert.equal(account.enable, true);
    });

    it("2.- Realizar el testing si el cliente hace un deposito mayor a 10 ETH se le retorna un bono de 2 ETH", async () => {
        const deposit = '15';
        await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
        const initialBalanceAccount = await web3.eth.getBalance(accounts[1]);
        await instance.depositMoney(newAccount.id, {
            from: accounts[1],
            value: web3.utils.toWei(deposit, "ether")
        });
        const finalBalanceAccount = await web3.eth.getBalance(accounts[1]);
        const total = weiToEther(initialBalanceAccount) - Number(deposit) + 2;
        assert.equal(weiToEther(finalBalanceAccount), total);
    });

    it("3.- Realizar el testing solo el dueño puedo cerrar el banco", async () => {
        try {
            const bankClosed = true;
            await instance.closeOrOpenBank(bankClosed, {from: accounts[0]});
            await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'The bank is closed.');
        }
    });

    it("4.- Realizar el testing el deposito minimo para una cuenta bancaria debe ser mayor a 2 ETH", async () => {
        try {
            const deposit = '1';
            await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
            await instance.depositMoney(newAccount.id, {
                from: accounts[1],
                value: web3.utils.toWei(deposit, "ether")
            });
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'The minimun deposit should be more than 2 ETH.');
        }
    });

    it("5.- Realizar el testing el nombre de la cuenta debe tener una longitud mayor a 5 de forma obligatoria", async () => {
        try {
            await instance.createAccount(Object.values({...newAccount, name: "test"}), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'The name of account should be more than 5.')
        }
    });

    it("6.- Realizar el testing solo el dueño del banco puede bloquear una cuenta bancaria para que esta no pueda " +
        "realizar ningun tipo de transaccion de retiro ni deposito", async () => {
        try {
            await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
            await instance.blockAccount(newAccount.id, {from: accounts[0]});

            const deposit = '10';
            await instance.depositMoney(newAccount.id, {
                from: accounts[1],
                value: web3.utils.toWei(deposit, "ether")
            });
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'Your account is blocked.')
        }
    });

    it("7.- Realizar el testing los clientes pueden hacer el retiro de su dinero controlar si cuenta con el dinero que desea " +
        "retirar en su cuenta bancaria", async () => {
        const deposit = '10';
        const amountToWithdraw = 5;
        await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
        await instance.depositMoney(newAccount.id, {
            from: accounts[1],
            value: web3.utils.toWei(deposit, "ether")
        });
        const initialBalanceAccount = await web3.eth.getBalance(accounts[1]);
        await instance.redrawMoney(newAccount.id, amountToWithdraw, {
            from: accounts[1]
        });
        const finalBalanceAccount = await web3.eth.getBalance(accounts[1]);
        assert.equal(weiToEther(initialBalanceAccount) + amountToWithdraw, weiToEther(finalBalanceAccount));
    });

    it("8.- Realizar el testing solo el dueño del banco puede retirar todos los fondos a su billetera digital, dejando al " +
        "banco sin fondos", async () => {
        const deposit = '50';
        await instance.createAccount(Object.values(newAccount), {from: accounts[0]});
        await instance.depositMoney(newAccount.id, {
            from: accounts[1],
            value: web3.utils.toWei(deposit, "ether")
        });
        const initialBalanceOwner = await web3.eth.getBalance(accounts[0]);
        const initialBalanceBank = await web3.eth.getBalance(instance.address);
        await instance.withdrawAllMoney({from: accounts[0]});
        const finalBalanceOwner = await web3.eth.getBalance(accounts[0]);
        const finalBalanceBank = await web3.eth.getBalance(instance.address);
        const total = weiToEther(initialBalanceOwner) + weiToEther(initialBalanceBank);
        assert.equal(weiToEther(finalBalanceOwner), total);
        assert.equal(finalBalanceBank, 0);
    });

});
