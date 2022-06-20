// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TestAmazon {

    struct Product {
        uint id;
        string name;
        uint stock;
        uint price;
    }

    address private ownerAddress;
    bool private storeClosed = false;

    event clientBuy(string name, address wallet, uint quantity);

    mapping(uint => Product) public listProducts;

    constructor() {
        ownerAddress = msg.sender;
    }

    /**
     * @dev add new product in listProducts
     * @param productData new Product
     */
    function addProduct(Product memory productData) public onlyOwner closedAmazon {
        require(bytes(productData.name).length > 5, "The name of product should be more than 5.");
        listProducts[productData.id] = Product(productData.id, productData.name, 0, productData.price);
    }

    /**
     * @dev increase quantity for one product in listProducts
     * @param id of product, stock quantity to increase
     */
    function addQuantity(uint id, uint stock) public onlyOwner closedAmazon {
        listProducts[id].stock += stock;
    }

    /**
     * @dev close and open amazon, change var closed
     * @param state value to set on closed
     */
    function closeOrOpenAmazon(bool state) public onlyOwner {
        storeClosed = state;
    }

    /**
     * @dev allow buy product for clients
     * @param id of product to buy, quantity of product to buy
     */
    function buyProduct(uint id, uint quantity) public payable closedAmazon {
        Product memory productData = listProducts[id];
        require((quantity * productData.price) <= convertWeiToEther(msg.value), "You don't have enought money.");
        require(quantity <= productData.stock, "There is not the stock in product.");
        listProducts[productData.id].stock -= quantity;
        emit clientBuy(productData.name, msg.sender, quantity);
        if (quantity > 10) {
            payable(msg.sender).transfer(convertEtherToWei(productData.price));
        }
    }

    /**
     * @dev owner can withdraw all money of the amazon store
     */
    function withdrawAllMoney() public onlyOwner closedAmazon {
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

    // modifier to allow just to owner to do something
    modifier onlyOwner() {
        require(ownerAddress == msg.sender, "You are not the owner.");
        _;
    }

    // modifier to verify if amazon store is closed
    modifier closedAmazon() {
        require(!storeClosed, "Amazon is closed.");
        _;
    }

}
