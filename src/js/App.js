import React, {Component} from 'react';
import axios from 'axios';
import CryptoBadge from './CryptoBadge';
import Wallet from './Wallet';
import Input from './Input';

const sample_wallet_01 = '0xecd7da67e6563bbddfc2ddff9ba2632c721af181';
const sample_wallet_02 = '0x0000000000000000000000000000000000000000'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
      wallet: null
    };
  }

  getWalletData(walletAddress) {
    if (!walletAddress || walletAddress === '') {
      return;
    }

    this.setState({
      loading: true
    });

    axios.get(`https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=freekey`)
      .then(res => {
        const walletData = res.data;

        if (walletData.error) {
          return walletData;
        }

        return axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
          .then(r => {
            walletData.ETH.price = {
              rate: r.data.USD,
              currency: 'USD'
            };

            return walletData;
          });
      })
      .then(walletData => {
        this.setState({
          loading: false,
          wallet: walletData.error ? walletData : new Wallet(walletData)
        });
      });
  }

  handleWalletAddressChange(value) {
    this.getWalletData(value);
  }

  formatTokenInfo(tokenInfo) {
    const formattedTokenInfo = [];

    if (!tokenInfo) {
      return;
    }

    tokenInfo.forEach(token => {
      formattedTokenInfo.push(
        <CryptoBadge
          symbol={ token.symbol }
          value={ token.value }
          balance={ token.formattedBalance }
          currency={ token.priceCurrency } />
      );
    });

    return formattedTokenInfo;
  };

  render() {
    let walletData = this.state.loading !== null ? 'Loading' : '';

    if (!this.state.loading && this.state.loading !== null && !this.state.wallet.error) {
      walletData = (
        <div>
          <p>Combined value: { this.state.wallet.combinedValue } { this.state.wallet.priceCurrency }</p>

          <CryptoBadge
            symbol='ETH'
            value={ this.state.wallet.value }
            balance={  this.state.wallet.balance }
            currency={ this.state.wallet.priceCurrency } />

          <br/>

          { this.formatTokenInfo(this.state.wallet.tokenInfo) }
        </div>
      );
    }

    if (this.state.wallet && this.state.wallet.error) {
      walletData = (
        <div>
          <p>
            <em>Unfortunately an error has occured</em>
          </p>
          <p>{ this.state.wallet.error.message }</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Ethereum Wallet Explorer</h1>

        <div>
          <Input
            onChange={ this.handleWalletAddressChange.bind(this) }
            startLabel="Please enter a wallet address to begin"
            className="walletAddress" toolTip="Click to change address"/>
        </div>

        <div>{ walletData }</div>

        <p>Powered by <a href="https://ethplorer.io">Ethplorer.io</a></p>
        <p>All values are estimated</p>
      </div>
    );
  }
}
