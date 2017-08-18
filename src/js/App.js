import React, { Component } from 'react';
import axios from 'axios';
import Badge from './Badge';

const WALLET_ADDR = '0x2f16cc0f50b1e7088177f71ab02985d4daaf7a03';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    axios.get(`https://api.ethplorer.io/getAddressInfo/${WALLET_ADDR}?apiKey=freekey`)
      .then(res => {
        this.setState(this.buildWalletInfo(res.data));
      });
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <Badge></Badge>

        <h1>{this.state.address}</h1>

        <ul>
          {this.state.tokenInfo.map(token =>
            <li>{token.symbol} - {token.balance}</li>
          )}
        </ul>
      </div>
    );
  }

  // Put all of the below into a service class
  buildWalletInfo(data) {
    const wallet = {};

    wallet.address = data.address;
    wallet.balance = data.ETH.balance;
    wallet.tokenInfo = this.buildTokenInfo(data.tokens);

    return wallet;
  }

  buildTokenInfo(tokens) {
    const tokenData = [];

    if (tokens.length > 0) {
      tokens.forEach(token => tokenData.push(this.buildToken(token)));
    }

    return tokenData;
  }

  buildToken(token) {
    const tok = {};

    tok.name = token.tokenInfo.name;
    tok.symbol = token.tokenInfo.symbol;
    tok.totalSupply = token.tokenInfo.totalSupply;
    tok.decimals = token.tokenInfo.decimals;
    tok.price = token.tokenInfo.price.rate;
    tok.priceCurrency = token.tokenInfo.price.currency;
    tok.balance = token.balance;

    return tok;
  }
}
