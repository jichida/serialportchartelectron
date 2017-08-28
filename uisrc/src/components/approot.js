import React, { Component } from 'react';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import MainView from './mainview';

export default class extends Component {
  static defaultProps = {
    color: '#cc7f29',
    theme: 'light'
  };

  render() {
    return (
      <Window
        color={this.props.color}
        theme={this.props.theme}
        chrome
        padding="12px"
      >
        <TitleBar title="磁滞回线图形软件" controls/>
        <MainView />
      </Window>
    );
  }
}
