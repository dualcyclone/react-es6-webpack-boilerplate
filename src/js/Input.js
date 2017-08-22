import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
      inputHidden: true,
      toolTipVisible: false
    };
  };

  onBlur(event) {
    const inputVal = event.target.value;

    this.setState({
      value: inputVal,
      inputHidden: true,
      toolTipVisible: false
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

  showTip() {
    const tip = this.props.toolTip;

    if (tip && tip !== '') {
      this.setState({
        toolTipVisible: true
      });
    }
  }

  hideTip() {
    const tip = this.props.toolTip;

    if (tip && tip !== '') {
      this.setState({
        toolTipVisible: false
      });
    }
  }

  render() {
    let partial = <input type="text" onBlur={ this.onBlur.bind(this) } autoFocus />;

    if (this.state.inputHidden) {
      partial =
        <div>
          <code>
            {this.state.value || this.props.startLabel || 'Enter code'}
          </code>
          <div className={ 'toolTip' + (!this.state.toolTipVisible ? ' hidden' : '') }>{ this.props.toolTip }</div>
        </div>;
    }

    return <div
      className={ this.props.className }
      onClick={ this.onClick.bind(this) }
      onMouseOver={ this.showTip.bind(this) }
      onMouseOut={ this.hideTip.bind(this) }>
      { partial }
    </div>
  }
}
