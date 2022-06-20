const TestAmazon = artifacts.require("TestAmazon");

const weiToEther = (wei) => {
    const ether = web3.utils.fromWei(wei, 'ether');
    return parseInt(ether);
}

contract("TestAmazon", (accounts) => {

    let instance;
    const newProduct = {id: 1, name: "T-shirt", stock: 0, price: 10};

    beforeEach("deploys a contract", async () => {
        instance = await TestAmazon.new();
    });

    it("1.- Realizar el testing solo el dueño de la tienda puede adicionar nuevos productos, " +
        "un producto debe crearse con cantidad igual a cero, controlar internamente", async () => {
        await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
        const product = await instance.listProducts.call(newProduct.id);
        assert.equal(product.id, newProduct.id);
        assert.equal(product.name, newProduct.name);
        assert.equal(product.stock, 0);
        assert.equal(product.price, newProduct.price);
    });

    it("2.- Realizar el testing al crear un producto el dueño debe ingresar un nombre con longitud mayor a 5 de forma obligatoria", async () => {
        try {
            await instance.addProduct(Object.values({...newProduct, name: "test"}), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'The name of product should be more than 5.')
        }
    });

    it("3.- Realizar el testing solo el dueño de la tienda puede aumentar la cantidad que tiene un producto", async () => {
        await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
        const newStock = 10;
        await instance.addQuantity(newProduct.id, newStock, {from: accounts[0]});
        const product = await instance.listProducts.call(newProduct.id);
        assert.equal(product.stock, newStock);
    });

    it("4.- Realizar el testing solo el dueño puedo cerrar la tienda", async () => {
        try {
            const storeClosed = true;
            await instance.closeOrOpenAmazon(storeClosed, {from: accounts[0]});
            await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'Amazon is closed.');
        }
    });

    it("5.- Realizar el testing solo el dueño puede retirar el total ganado a su direccion de billetera", async () => {
        const newStock = 3;
        const stockToBuy = 2
        await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
        await instance.addQuantity(newProduct.id, newStock, {from: accounts[0]});
        await instance.buyProduct(newProduct.id, stockToBuy, {
            from: accounts[1],
            value: web3.utils.toWei("30", "ether")
        })

        const initialBalanceOwner = await web3.eth.getBalance(accounts[0]);
        const initialBalanceStore = await web3.eth.getBalance(instance.address);
        await instance.withdrawAllMoney({from: accounts[0]});

        const finalBalanceOwner = await web3.eth.getBalance(accounts[0]);
        const finalBalanceStore = await web3.eth.getBalance(instance.address);
        const total = weiToEther(initialBalanceOwner) + weiToEther(initialBalanceStore);
        assert.equal(total, weiToEther(finalBalanceOwner));
        assert.equal(finalBalanceStore, 0);
    });

    it("6.- Realizar el testing el cliente puede comprar de 1 a N productos (hacer el calculo correspondiente segun el " +
        "precio unitario del producto) verificar el descuento a la wallet del cliente, quantity del producto y el balance del smart contract", async () => {
        const newStock = 10;
        const stockToBuy = 2;
        const valueEtherEntered = '20';
        await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
        await instance.addQuantity(newProduct.id, newStock, {from: accounts[0]});

        const initialBalanceClient = await web3.eth.getBalance(accounts[1]);
        await instance.buyProduct(newProduct.id, stockToBuy, {
            from: accounts[1],
            value: web3.utils.toWei(valueEtherEntered, "ether")
        });
        const product = await instance.listProducts.call(newProduct.id);
        const balanceStore = await web3.eth.getBalance(instance.address);
        const finalBalanceClient = await web3.eth.getBalance(accounts[1]);
        const total = weiToEther(finalBalanceClient) + Number(valueEtherEntered);
        assert.equal(product.stock, (newStock - stockToBuy));
        assert.equal(weiToEther(balanceStore), Number(valueEtherEntered));
        assert.equal(weiToEther(initialBalanceClient), total);
    });

    it("7.- Realizar el testing el cliente puede comprar de 1 a N productos (hacer el calculo correspondiente segun el " +
        "precio unitario del producto) controlar internamente si existe el stock suficiente para comprar el producto", async () => {
        try {
            const stockToBuy = 3;
            const newStock = 2;
            const valueEtherEntered = '40';
            await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
            await instance.addQuantity(newProduct.id, newStock, {from: accounts[0]});
            await instance.buyProduct(newProduct.id, stockToBuy, {
                from: accounts[1],
                value: web3.utils.toWei(valueEtherEntered, "ether")
            });
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'There is not the stock in product.');
        }
    });

    it("8.- Realizar el testing de si el cliente compra mas de 10 productos de un solo tipo " +
        "se le realiza un descuento del precio de uno", async () => {
        const stockToBuy = 12;
        const newStock = 15;
        const valueEtherEntered = '130';
        await instance.addProduct(Object.values(newProduct), {from: accounts[0]});
        await instance.addQuantity(newProduct.id, newStock, {from: accounts[0]});
        const initialBalanceClient = await web3.eth.getBalance(accounts[1]);
        await instance.buyProduct(newProduct.id, stockToBuy, {
            from: accounts[1],
            value: web3.utils.toWei(valueEtherEntered, "ether")
        });
        const finalBalanceClient = await web3.eth.getBalance(accounts[1]);
        const total = weiToEther(initialBalanceClient) - Number(valueEtherEntered) + newProduct.price;
        assert.equal(weiToEther(finalBalanceClient), total);
    });

});
