import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
// import {connectWallet, initialize} from "./ethereum/web3";
// import contract from "./ethereum/abis/Lottery.json"
// import contract from "./ethereum-hardhat/artifacts/src/ethereum-hardhat/contracts/Main.sol/Main.json"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          UPB COIN
        </p>
      </header>
    </div>
  );

}

export default App;
