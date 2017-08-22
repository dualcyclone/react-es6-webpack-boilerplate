import React, { Component } from 'react';

export default class CryptoBadge extends Component {
  render() {
    return (
      <section className="token" key={ this.props.symbol }>
        <h1>{ this.props.symbol }</h1>
        <table>
          <tbody>
            <tr>
              <th>Balance</th>
            </tr>
            <tr>
              <td><span className="balance">{ this.props.balance }</span></td>
            </tr>
            <tr>
              <td><span className="balance">{ this.props.value }</span> { this.props.currency }</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
