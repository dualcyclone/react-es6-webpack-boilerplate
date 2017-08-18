export default class Wallet {
  constructor(walletInfo) {
    return this.buildWalletInfo(walletInfo);
  }

  buildWalletInfo(data) {
    const wallet = {};
    const tokenData = this.buildTokenInfo(data.tokens);

    wallet.address = data.address;
    wallet.balance = data.ETH.balance;
    wallet.combinedValue = 0;
    wallet.tokenInfo = tokenData.tokenInfo;
    wallet.value = (wallet.balance * data.ETH.price.rate).toFixed(2);
    wallet.combinedValue = parseFloat(wallet.value) + tokenData.combinedValue;
    wallet.priceCurrency = data.ETH.price.currency;

    return wallet;
  }

  buildTokenInfo(tokens) {
    const tokenInfo = [];
    let combinedValue = 0;

    if (tokens && tokens.length > 0) {
      tokens.forEach((token) => {
        if (token.tokenInfo.symbol === '') {
          return;
        }

        const formattedToken = this.buildToken(token);

        combinedValue += parseFloat(formattedToken.value);

        tokenInfo.push(formattedToken);
      });
    }

    return {
      tokenInfo: tokenInfo,
      combinedValue: combinedValue
    };
  }

  buildToken(token) {
    const tok = {};

    tok.name = token.tokenInfo.name;
    tok.symbol = token.tokenInfo.symbol;
    tok.totalSupply = token.tokenInfo.totalSupply;
    tok.decimals = token.tokenInfo.decimals;
    tok.price = token.tokenInfo.price ? token.tokenInfo.price.rate : 0;
    tok.priceCurrency = token.tokenInfo.price ? token.tokenInfo.price.currency : 'USD';
    tok.balance = token.balance;
    tok.formattedBalance = (token.balance / (10 ** tok.decimals)).toFixed(tok.decimals);
    tok.value = ((token.balance * tok.price) / (10 ** tok.decimals)).toFixed(2);

    return tok;
  }
}
