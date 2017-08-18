import React, {Component} from 'react';
import axios from 'axios';
import Badge from './Badge';
import Wallet from './Wallet';

const WALLET_ADDR = '0x2f16cc0f50b1e7088177f71ab02985d4daaf7a03';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // axios.get(`https://api.ethplorer.io/getAddressInfo/${WALLET_ADDR}?apiKey=freekey`)
    //   .then(res => {
    //     console.log(res)
    //     // this.setState(new Wallet(res.data));
    //   });

    const testwallet = {
      address: "0xff71cb760666ab06aa73f34995b42dd4b85ea07b",
      ETH: {
        balance: 0
      },
      tokens: [
        {
          tokenInfo: {
            name: "THBEX",
            symbol: "THBEX",
            totalSupply: "3020000000",
            decimals: "4",
            price: {
              rate: 3.8,
              currency: "USD"
            }
          },
          balance: 1234567890
        }
      ]
    };

    this.setState(new Wallet(testwallet));
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <Badge />

        <h1>{this.state.address}</h1>

        <ul>
          {this.state.tokenInfo && this.state.tokenInfo.map(token =>
            <li key={token.symbol}>{token.symbol} - {token.balance}</li>
          )}
        </ul>

        <p>Powered by <a href="https://ethplorer.io">Ethplorer.io</a></p>
      </div>
    );
  }
}
