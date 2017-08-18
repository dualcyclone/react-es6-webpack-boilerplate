import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
      inputHidden: true
    };
  };

  onBlur(event) {
    const inputVal = event.target.value;

    this.setState({
      value: inputVal,
      inputHidden: true
    });

    if (this.props.onChange) {
      this.props.onChange(inputVal);
    }
  }

  onClick() {
    this.setState({
      inputHidden: false
    });
  }

  render() {
    let partial = <input type="text" onBlur={ this.onBlur.bind(this) } autoFocus />;

    if (this.state.inputHidden) {
      partial = <code onClick={ this.onClick.bind(this) }>
          {this.state.value || 'Enter code'}
        </code>;
    }

    return <div className={ this.props.className }>
      { partial }
    </div>
  }
}
