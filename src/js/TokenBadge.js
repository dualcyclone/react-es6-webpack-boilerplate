import React, { Component } from 'react';

export default class TokenBadge extends Component {
  render() {
    const token = this.props.info;

    return (
      <section className="token" key={ token.symbol }>
        <h1>{ token.symbol }</h1>
        <table>
          <tbody>
            <tr>
              <th>Balance</th>
            </tr>
            <tr>
              <td>{ token.formattedBalance }</td>
            </tr>
            <tr>
              <td>{ token.value } { token.priceCurrency }</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
