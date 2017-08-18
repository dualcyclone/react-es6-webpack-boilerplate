import React, {Component} from 'react';
import axios from 'axios';
import TokenBadge from './TokenBadge';
import Wallet from './Wallet';
import Input from './Input';

const WALLET_ADDR = '0x2f16cc0f50b1e7088177f71ab02985d4daaf7a03';

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
        <TokenBadge info={ token } />
      );
    });

    return formattedTokenInfo;
  };

  render() {
    let walletData = this.state.loading !== null ? 'Loading' : '';

    if (!this.state.loading && this.state.loading !== null && !this.state.wallet.error) {
      walletData = (
        <div>
          <p>Balance: { this.state.wallet.balance } ETH</p>
          <p>Ethereum value: { this.state.wallet.value } { this.state.wallet.priceCurrency }</p>
          <p>Combined value: { this.state.wallet.combinedValue } { this.state.wallet.priceCurrency }</p>

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
          Wallet address: <Input onChange={ this.handleWalletAddressChange.bind(this) } className="walletAddress"/>
        </div>

        <div>{ walletData }</div>

        <p>Powered by <a href="https://ethplorer.io">Ethplorer.io</a></p>
        <p>All values are estimated</p>
      </div>
    );
  }
}

0xe7775a6e9bcf904eb39da2b68c5efb4f9360e08c
0x0000000000000000000000000000000000000000
