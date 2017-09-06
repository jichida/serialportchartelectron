import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import MainView from './mainview';
import {
  queryverifydata_request
} from '../actions';
class Page extends  React.Component {
    static defaultProps = {
        color: '#0075c1',
        theme: 'light'
    };
    componentWillMount () {
      this.props.dispatch(queryverifydata_request({}));
    }
    render() {
        return (
            <Window
                color={this.props.color}
                theme={this.props.theme}
                chrome
                style={{
                    border : "none",
                    background : "#0075c1"
                }}
                >
                <MainView />
            </Window>
        );
    }
}
export default connect()(Page);
