import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Button } from 'antd';
import Seltime from './seltime';
import { Pagination } from 'antd';
import moment from 'moment';
import ChartXY from './chartxy';
import {
  querydata_request,
} from '../actions';

import "../antd.min.css";
import "../historydata.css";

let list = ["0","1","0","1","0","1","0","1","0"];

class Historydata extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        startDate:moment(),
        endDate:moment(),
      };
  }
  onChangeSelDate(startDate,endDate){
    this.setState({
      startDate,
      endDate
    });
  }
  onClickQuery=()=>{

    const options = {page:1,limit:10};
    const query = {
      "createtimestring":{"$gte":this.state.startDate.format("YYYY-MM-DD HH:mm:ss"),"$lte":this.state.endDate.format("YYYY-MM-DD HH:mm:ss")}
    };

    console.log(`查询条件:${JSON.stringify(query)}`);
    this.props.dispatch(querydata_request({query,options}));
  }

  onChange=(page,pageSize)=>{
    const query = {
      "createtimestring":{"$gte":this.state.startDate.format("YYYY-MM-DD HH:mm:ss"),"$lte":this.state.endDate.format("YYYY-MM-DD HH:mm:ss")}
    };
    const options = {page:page,limit:pageSize};

    console.log(`查询条件:${JSON.stringify(query)}`);
    this.props.dispatch(querydata_request({query,options}));
  }

  render() {
        const {total,defaultCurrent,current,pageSize,datalist} = this.props;
        let liheight = (window.innerHeight-185)/3;
        const liwidth =  (window.innerWidth-185)/3;
        return (
            <div style={{width : "100%"}}>
                <div style={{display:"flex"}}>
                  <Seltime  startDate = {this.state.startDate}
                    endDate = {this.state.endDate}
                   onChangeSelDate={this.onChangeSelDate.bind(this)}/>
                    <Button type="primary" icon="search" style={{marginLeft:"10px"}} onClick={this.onClickQuery}>查询</Button>
                </div>
                <div className="list">
                    <ul className="listdata">
                        {
                            _.map(datalist, (v, key)=>{
                                const {line1,line2} = v;
                                return
                                (<li key={key} style={{height : liheight+"px"}}>
                                  <ChartXY height={liheight} width={liwidth} line1={line1} line2={line2}/>
                                </li>)
                            })
                        }
                    </ul>
                    <Pagination defaultCurrent={defaultCurrent} pageSize={pageSize} current={current} total={total} onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({querydata}) => {
  return {...querydata};
}

export default connect(mapStateToProps)(Historydata);
