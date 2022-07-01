// @ts-ignore
import { initialize } from "../ethereum/web3";
import React, { useEffect, useState } from "react";
import contractToken from "../ethereum/abis/Main.json";

const Coin = () => {
  const [contract, setContract] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [addressContract, setAddressContract] = useState("");

  const [account, setAccount] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [addressBalance, setAddressBalance] = useState("");
  const [amountTokens, setAmountTokens] = useState(0);
  const [tokensPrice, setTokensPrice] = useState(0);

  useEffect(() => {
    // @ts-ignore
    if (window.web3) {
      initialize();
      loadBlockchainData();
    }
  }, []);

  const loadBlockchainData = async () => {
    // @ts-ignore
    const Web3 = window.web3;

    // Rinkeby 4, Ganache 5777, BSC 97
    const networkData = contractToken.networks["5777"];
    console.log("networkData:", networkData);

    if (networkData) {
      const abi = contractToken.abi;
      const address = networkData.address;
      setAddressContract(address);
      const contractDeployed = new Web3.eth.Contract(abi, address);
      setContract(contractDeployed);
    } else {
      window.alert("!El Smart Contract no se ha desplegado en la res!");
    }
  };

  /**
   * Function to buy tokens
   */
  const buyTokens = async (address: any, amount: number) => {
    try {
      setMessage("Compra de tokens en ejecucion.");
      setLoading(true);
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      const priceTokens = await contract.methods.priceTokens(amount).call();
      await contract.methods.buyTokens(address, amount).send({
        from: accounts[0],
        value: priceTokens,
      });
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  /**
   * Function to get tokens balance of account
   */
  const accountBalance = async (address: any) => {
    try {
      setMessage("Balance de tokens de una persona en ejecucion...");
      setLoading(true);
      const balance = await contract.methods.balanceAccount(address).call();
      alert(parseFloat(balance));
      setAddressBalance(balance);
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  /**
   * Function to get total supply of tokens
   */
  const getTotalSupply = async () => {
    try {
      setMessage("Balance de tokens del smart contract en ejecucion...");
      setLoading(true);
      const balance = await contract.methods.getTotalSupply().call();
      alert(parseFloat(balance));
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  /**
   * Function to generate new tokens
   */
  const generateNewTokens = async (amount: number) => {
    try {
      setMessage("Incremento de tokens del Smart Contract en ejecucion...");
      setLoading(true);
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      await contract.methods.generetaTokens(amount).send({ from: accounts[0] });
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  /**
   * Function to get price of tokens
   */
  const getPriceTokens = async (amount: number) => {
    try {
      setMessage(
        "Obteniendo precio de tokens del Smart Contract en ejecucion..."
      );
      setLoading(true);
      const price = await contract.methods.priceTokens(amount).call();
      alert(price);
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="container" data-aos="fade-up">
      <div className="section-title">
        <h2>UPB COIN</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
          aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
          quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
          fugiat sit in iste officiis commodi quidem hic quas.
        </p>
        <p>{message}</p>
        <p>{loading ? "Procesando..." : ""}</p>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="info-box-coin" data-aos="fade-up">
              <form
                className="php-email-form w-100"
                data-aos="fade-up"
                style={{ minHeight: "256px" }}
                onSubmit={(event) => {
                  event.preventDefault();
                  buyTokens(account, quantity);
                }}
              >
                <h3>Comprar tokens ERC-20</h3>

                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    onChange={(e: any) => setAccount(e.target.value)}
                    placeholder="Direccion de destino"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Cantidad de tokens a comprar (1 token = 1 Ether)"
                    onChange={(e: any) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-danger">
                    COMPRAR TOKENS
                  </button>
                </div>
              </form>
            </div>

            <div className="info-box-coin" data-aos="fade-up">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  getTotalSupply();
                }}
                style={{ minHeight: "256px" }}
                className="php-email-form w-100"
                data-aos="fade-up"
              >
                <h3>Balance total de tokens del Smart Contract</h3>
                <div className="text-center">
                  <button type="submit">BALANCE DE TOKENS</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="info-box-coin" data-aos="fade-up">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                accountBalance(addressBalance);
              }}
              style={{ minHeight: "256px" }}
              className="php-email-form w-100"
              data-aos="fade-up"
            >
              <h3>Balance de tokens de un usuario</h3>

              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Direccion del usuario"
                  onChange={(e: any) => setAddressBalance(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">
                  BALANCE DE TOKENS
                </button>
              </div>
            </form>
          </div>
          <div className="info-box-coin" data-aos="fade-up">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                generateNewTokens(amountTokens);
              }}
              style={{ minHeight: "256px" }}
              className="php-email-form w-100"
              data-aos="fade-up"
            >
              <h3>Añadir nuevos Tokens</h3>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Cantidad de tokens a incrementar"
                  onChange={(e: any) => setAmountTokens(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit">INCREMENTO DE TOKENS</button>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="info-box-coin " data-aos="fade-up">
              <form
                style={{ minHeight: "256px" }}
                className="php-email-form w-100"
                data-aos="fade-up"
              >
                <h3>Direccion del Smart Contract en GANACHE</h3>
                <p>{addressContract}</p>
              </form>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="info-box-coin" data-aos="fade-up">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  getPriceTokens(tokensPrice);
                }}
                style={{ minHeight: "256px" }}
                className="php-email-form w-100"
                data-aos="fade-up"
              >
                <h3>Calcular precio de Tokens en ETH</h3>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Cantidad de tokens"
                    onChange={(e: any) => setTokensPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit">CALCULAR PRECIO</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
