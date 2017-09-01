import React, { Component } from 'react';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import MainView from './mainview';

export default class extends Component {
    static defaultProps = {
        color: '#0075c1',
        theme: 'light'
    };

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
