import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from "./ethereum/web3";
//import contractLottery from "./ethereum/abis/Lottery.json"
import contractLottery from "./ethereum-hardhat/artifacts/src/ethereum-hardhat/contracts/Lottery.sol/Lottery.json"

function App() {

  const [contract, setContract] = useState<any>('');

  const [manager, setManager] = useState<any>('');
  const [players, setPlayers] = useState<any>([]);
  const [balance, setBalance] = useState<any>('');

  const [value, setValue] = useState<any>('');
  const [message, setMessage] = useState<any>('');

  useEffect( ()=> {
    // @ts-ignore
    if(window.web3) {
      initialize()
      loadBlockchainData()
    }
  }, [])

  const loadBlockchainData = async () => {

    //const contractDeployed;

    // @ts-ignore
    const Web3 = window.web3;

    // Rinkeby 4, Ganache 5777, BSC 97
    //const networkData = contractLottery.networks['4'];
    //console.log('networkData:', networkData);

    //if(networkData) {
      const abi = contractLottery.abi;
      //const address = networkData.address;
     //console.log('address: ', address);
      //const contractDeployed = new Web3.eth.Contract(abi, address);
      const contractDeployed = new Web3.eth.Contract(abi, '0x28eC4c1110F3c42112f86fe06523fC969B5330d2');

      const players = await contractDeployed.methods.getPlayers().call();
      setPlayers(players);
      const manager = await contractDeployed.methods.manager().call();
      setManager(manager)
      const balance = await Web3.eth.getBalance(contractDeployed.options.address)
      setBalance(balance)

      setContract(contractDeployed)
    //}

  }

  const loadBalance = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const balance = await Web3.eth.getBalance(contract.options.address)
    setBalance(balance)
  }

  const loadPlayers = async () => {
    const players = await contract.methods.getPlayers().call();
    setPlayers(players);
  }

  const onEnter = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    setMessage("waiting on transaction success...")
    await contract.methods.enter().send({
      from: accounts[0],
      value: Web3.utils.toWei(value, "ether")
    })
    setMessage("you have been entered...")
    loadBalance();
    loadPlayers();
  }

  const onPickWinner = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    setMessage("waiting on transaction success...")

    await contract.methods.pickWinner().send({
      from: accounts[0]
    })

    setMessage("A winner has been picked!")
    loadBalance();
    loadPlayers();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Hi React, Truffle, Firebase</p>
        <button onClick={() => connectWallet()} className="btn btn-success">Connect</button>

        <button onClick={ () => onPickWinner() } className="btn btn-success">Pick Winner</button>

        <p>PLAYERS: {players.length}</p>
        <p>BALANCE: {balance}</p>
        <p>MANAGER: {manager}</p>

        <p>Monto minimo mayor a 2 ETH</p>
        <input type="text" value={value} onChange={ (event) => { setValue(event.target.value) } }/>
        <button onClick={ () => { onEnter() } } className="btn btn-warning">Enter</button>
        <p>{message}</p>

      </header>
    </div>
  );
}

export default App;
