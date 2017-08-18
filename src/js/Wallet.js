export default class Wallet {
  constructor(walletInfo) {
    return this.buildWalletInfo(walletInfo);
  }

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
