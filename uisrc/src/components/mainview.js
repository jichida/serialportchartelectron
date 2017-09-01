import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavPane, NavPaneItem, Text } from 'react-desktop/windows';
import ChartShow from './chartshow';
import { Button } from 'react-desktop/windows';
import {
  getrealtimedata_request,
  querydata_request,
} from '../actions';

class MainPage extends Component {
    static defaultProps = {
        color: '#FFFFFF',
        theme: 'dark'
    };

    constructor() {
        super();
        this.state = {
            selected: '工作台'
        }
    }

    render() {
        return (
            <NavPane 
                openLength={200} 
                push 
                color={"#FFFFFF"} 
                theme={this.props.theme}>
                {this.renderItem1('工作台', <ChartShow />)}
                {this.renderItem2('历史查询', '==历史查询控件==')}
            </NavPane>
        );
    }

    renderItem1(title, content) {
        return (
            <NavPaneItem
                title={<span style={{color: "#FFF"}}>{title}</span>}
                icon={this.renderIcon(title)}
                theme="light"
                background="#0075c1"
                selected={this.state.selected === title}
                onSelect={() => this.setState({ selected: title })}
                padding="10px 20px"
                color = {this.props.color}
                push
                >
                <Text>{content}</Text>
                <Button push color={this.props.color} onClick={() => {this.props.dispatch(getrealtimedata_request({}));}}>
                开始测量
                </Button>
            </NavPaneItem>
        );
    }

    renderItem2(title, content) {
        return (
            <NavPaneItem
                title={<span style={{color: "#FFF"}}>{title}</span>}
                icon={this.renderIcon(title)}
                theme="light"
                background="#0075c1"
                selected={this.state.selected === title}
                onSelect={() => this.setState({ selected: title })}
                padding="10px 20px"
                color = {this.props.color}
                push
                >
                <Text>{content}</Text>
            </NavPaneItem>
        );
    }

    renderIcon(name) {
        const fill = this.props.theme === 'dark' ? '#ffffff' : '#FFFFFF';
        switch(name) {
            case '工作台':
                return (
                    <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEXklEQVR4Xu2d4XnUMAyGrQ3YANiADaCTwAhsAGzABsAk0A06QtkAJhCPoUdzR5zYwVHk05vfbiR9evPZTi6pJI7QCkjo6ik+AUBwCAAAAIIrELx8HAAAgisQvHwcAACCKxC8fBwAAIIrELx8HAAAgisQvHwcAACCKxC8fBwAAIIrELx8HAAA5hVQ1a8FbTI0Gly34coXkZu5pIsOoKo0ebg2lxMWkdleA8AVNXmpFAAI0uhSmQAAAEwBkRno6QBfUkr3kcV0XPuzlNLr2dV+x0XgjYh8cyxC2NRU9VVKaXb73tMBAMApYgDgtDFWaQGAldJO4wCA08ZYpQUAVko7jQMAThtjlRYAWCntNA4AOG2MVVoAYKW00zgA4LQxVmldNQCqWrzPXRD4u4h8thLfQ5xrB6B4n7sg/q2I5L8JcwDAeasBYKLH8A+DlujGAf4ogAPgANf7OBgHWF/K4ACDOsDDDufpeov/jvgpIneX4wFgXADep5TeNQAwu8AFAABgDTBhYJhtoKriAGv2d82LQABY6/7KHnf0+wAAMOngwor4eUrpTQUrpyH53YVPc+NF5LbhPLsPBYBzAErzYdOcvmVFvHunCwEAAABYBJ4YWLgacIDHC+V67wMAQNVEBABrMrEGOFfI3ePghdV+/pbN3A857kTk7VrjJ1PJi5TSx8L42duue+8ONtRcKndWiy3Qb/lETJeXQxes/oOI5EXRbkfp+0elq6RXInvXDACVnQKAR6FwgAk0OMD5frz0mTimgEqnuRzGFFB3w4c1wHbAxnkcvPfVsKQha4Ad1gCqmr8b9LIB3t2v9IZcfg9d+Dpq07S3oMWuNR+6CwCAR9wAoO7S2/VqqEvhfBQO8B+7ABwAB2AN8MAAU0Cd/zIF1OlUPYpFYLVUbQM3TG9Nu4a2bMqjAaCXkhfnAYBzQWbp3iCSuymgxM+G2nCAiosRACpEahnCFNCiVsNYHIApoHWLG3IKyD/BetJwYd2LyBD/eAIHqHCAhsYPNxQAAIApYMLAIfPbkbaBA+AAOAAO0PRjl0Nc8tD7AEda9N6xVbV1h5Nf3Pixd16X5wcAa8WdxQMAZw2xTgcArBV3Fg8AnDXEOh0AsFbcWbzeAJS+tX/ICteZ1i7TUdX8LCbvWP45Sv/vufhyqMsKSaq7AgDQXdKxTggAY/Wre7YA0F3SsU4IAGP1q3u2oqot36nvngAnPFaBDEDpSyDHZkZ0EwUAwERmv0EAwG9vTDIDABOZ/QYBAL+9MckMAExk9hsEAPz2xiQzADCR2W8QAPDbG5PMAMBEZr9BAMBvb0wyAwATmf0GAQC/vTHJDABMZPYbBAD89sYkMwAwkdlvEADw2xuTzADARGa/QQDAb29MMgMAE5n9BgEAv70xyQwATGT2GwQA/PbGJLMMQP4CFkdQBXgzKGjjT2UDAAAEVyB4+TgAAARXIHj5OAAABFcgePk4AAAEVyB4+TgAAARXIHj5OEBwAH4Btzhzmpw8lKYAAAAASUVORK5CYII="
                        style={{width: "20px"}}
                    />
                );
            case '历史查询':
                return (
                    <img 
                        src="data:image/png;base64,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"
                        style={{width: "20px"}}
                    />
                );
        }
    }
}

// const mapStateToProps = () => {};
export default connect()(MainPage);
