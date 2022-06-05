// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

// AMAZON

contract TestA {

    address private owner;
    bool private closed = false;
    event clientBuy(string name, address wallet, uint quantity);

    struct Product {
        uint id;
        string name;
        uint stock;
        uint price;
    }

    mapping(uint => Product) public listProducts;

    constructor() {
        owner = msg.sender;
    }

    function addProduct(Product memory productData) public onlyOwner(msg.sender) closedAmazon {
        require(bytes(productData.name).length > 5, "the name of product should be more than 5.");
        listProducts[productData.id] = Product(productData.id, productData.name, 0, productData.price);
    }

    function addQuantity(uint id, uint stock) public onlyOwner(msg.sender) closedAmazon {
        listProducts[id].stock += stock;
    }

    function closeOrOpenAmazon(bool value) public onlyOwner(msg.sender) {
        closed = value;
    }

    function buyProduct(uint id, uint quantity) public payable closedAmazon {
        Product memory productData = listProducts[id];
        require((quantity * productData.price) <= convertWeiToEther(msg.value), "you don't have enought money.");
        require(quantity <= productData.stock, "there is not the stock in product.");

        listProducts[productData.id].stock -= quantity;
        emit clientBuy(productData.name , msg.sender, quantity);

        if(quantity > 10) {
            payable(msg.sender).transfer(productData.price);
        }
    }

    function withdrawAllMoney() public onlyOwner(msg.sender) closedAmazon {
        payable(msg.sender).transfer(address(this).balance);
    }

    modifier onlyOwner(address wallet) {
        require(owner == wallet, "you are not the owner.");
        _;
    }

    modifier closedAmazon() {
        require(!closed, "Amazon is closed.");
        _;
    }

    function convertWeiToEther(uint amountInWei) private pure returns(uint) {
        return amountInWei / 1 ether;
    }

}
