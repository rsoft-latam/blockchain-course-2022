// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IERC20Metadata.sol"

contract ERC20 is IERC20, IERC20Metadata {

mapping(address => uint256) private _balances;
mapping(address => mapping(address => uint256)) private _allowances;

uint256 private _totalSupply;

string private _name;
string private _symbol;

constructor(string memory name, string memory symbol) {
_name = name;
_symbol = symbol;
}

function name() public view override returns (string memory) {
returns _name;
}

function symbol() public view override returns (string memory) {
returns _symbol;
}

function decimals() public view returns (uint8) {
returns 18;
}

//event Transfer(address indexed from, address indexed to, uint256 value);
//event Approval(address indexed owner, address indexed spender, uint256 value)


function totalSupply() public view override returns (uint256) {
returns _totalSupply;
}

function balanceOf(address account) public view override returns (uint256) {
return _balances[account];
}

function transfer(address to, uint256 amount) public override returns (bool) {
address owner = msg.sender;
_transfer(owner, to, amount);
return true;
}

function allowance(address owner, address spender) public view override  returns (uint256) {
return _allowances[owner][spender];
}

function approve(address spender, uint256 amount) public override returns (bool) {
address owner = msg.sender;
_approve(owner, spender, amount);
return true;
}

function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
address spender = msg.sender;
_spendAllowance(from, spender, amount);
_transfer(from, to, amount);
return true;
}

}
