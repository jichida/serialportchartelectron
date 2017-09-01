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
    color: '#cc7f29',
    theme: 'light'
  };

  constructor() {
    super();
    this.state = {
      selected: '工作台'
    }
  }

  render() {
    return (
      <NavPane openLength={200} push color={this.props.color} theme={this.props.theme}>
        {this.renderItem1('工作台', <ChartShow />)}
        {this.renderItem2('历史查询', '==历史查询控件==')}
      </NavPane>
    );
  }

  renderItem1(title, content) {
    return (
      <NavPaneItem
        title={title}
        icon={this.renderIcon(title)}
        theme="light"
        background="#ffffff"
        selected={this.state.selected === title}
        onSelect={() => this.setState({ selected: title })}
        padding="10px 20px"
        push
      >
        <Text>{content}</Text>
        <Button push color={this.props.color} onClick={
          () => {this.props.dispatch(getrealtimedata_request({}));}
        }>
         开始测量
       </Button>
       <Button push color={this.props.color} onClick={
         () => {
           //querydata_request:{query:{},options:{page:page,limit:pageSize}}
           this.props.dispatch(querydata_request({query:{},options:{page:1,limit:10}}));
         }
       }>
        查询
      </Button>
      </NavPaneItem>
    );
  }

  renderItem2(title, content) {
    return (
      <NavPaneItem
        title={title}
        icon={this.renderIcon(title)}
        theme="light"
        background="#ffffff"
        selected={this.state.selected === title}
        onSelect={() => this.setState({ selected: title })}
        padding="10px 20px"
        push
      >
        <Text>{content}</Text>
      </NavPaneItem>
    );
  }

  renderIcon(name) {
    const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';
    switch(name) {
    case '工作台':
      return (
        <svg x="0px" y="0px" width="16px" height="14.9px" viewBox="0 0 16 14.9">
          <polygon fill={fill} points="16,5.6 10.6,4.7 8,0 5.4,4.7 0,5.7 3.8,9.6 3.1,14.9 8,12.6 13,14.8 12.3,9.5 "/>
        </svg>
      );
    case '历史查询':
      return (
        <svg x="0px" y="0px" width="16px" height="13.5px" viewBox="0 0 16 13.5">
          <path
            fill={fill}
            d="M16,4.2C16,1.9,14.1,0,11.7,0c-1.4,0-2.6,0.6-3.4,1.6c0,0,0,0,0,0C8.3,1.7,8.1,1.8,8,1.8
            c-0.2,0-0.3-0.1-0.4-0.2c0,0,0,0,0,0C6.8,0.6,5.6,0,4.3,0C1.9,0,0,1.9,0,4.2c0,0,0,0.1,0,0.1l0,0c0,0,0,0.1,0,0.3
            C0,4.8,0.1,5,0.1,5.2c0.3,1.4,1.4,4.1,5.1,6.5c2.1,1.4,2.6,1.8,2.8,1.8c0,0,0,0,0,0c0,0,0,0,0,0c0.1,0,0.7-0.4,2.8-1.8
            c3.5-2.3,4.6-4.8,5-6.3C15.9,5.1,16,4.8,16,4.5C16,4.3,16,4.2,16,4.2L16,4.2C16,4.2,16,4.2,16,4.2z"
          />
        </svg>
      );
    }
  }
}

// const mapStateToProps = () => {};
export default connect()(MainPage);
