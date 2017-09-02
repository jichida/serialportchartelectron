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
  ui_changedate,
} from '../actions';

import "../antd.min.css";
import "../historydata.css";

class Historydata extends React.Component {
  constructor(props) {
      super(props);
  }
  onChangeSelDate(startDate,endDate){
    this.props.dispatch(ui_changedate({startDate,endDate}));
  }
  onClickQuery=()=>{

    const options = {page:1,limit:this.props.pageSize};
    const query = {
      "createtimestring":{"$gte":this.props.startDate.format("YYYY-MM-DD HH:mm:ss"),"$lte":this.props.endDate.format("YYYY-MM-DD HH:mm:ss")}
    };

    console.log(`查询条件:${JSON.stringify(query)}`);
    this.props.dispatch(querydata_request({query,options}));
  }

  onChange=(page,pageSize)=>{
    const query = {
      "createtimestring":{"$gte":this.props.startDate.format("YYYY-MM-DD HH:mm:ss"),"$lte":this.props.endDate.format("YYYY-MM-DD HH:mm:ss")}
    };
    const options = {page:page,limit:pageSize};

    console.log(`查询条件:${JSON.stringify(query)}`);
    this.props.dispatch(querydata_request({query,options}));
  }

  render() {
        const {total,defaultCurrent,current,pageSize,datalist} = this.props;
        let liheight = (window.innerHeight-185)/3;
        const liwidth =  (window.innerWidth-270)/3;
        let itemsco = [];
        _.map(datalist, (v, key)=>{
            const {line1,line2,createtimestring} = v;
            itemsco.push(<li key={key} style={{height : liheight+"px", width : liwidth+"px", overflow : "hidden"}}>
                <div style={{paddingLeft: "10px"}}>测量时间： {createtimestring} </div>
                <ChartXY height={liheight} width={liwidth} line1={line1} line2={line2}/>
            </li>);
        });
        return (
            <div style={{width : "100%"}}>
                <div style={{display:"flex"}}>
                    <Seltime
                        startDate = {this.props.startDate}
                        endDate = {this.props.endDate}
                        onChangeSelDate={this.onChangeSelDate.bind(this)}
                        />
                    <Button type="primary" icon="search" style={{marginLeft:"10px"}} onClick={this.onClickQuery}>查询</Button>
                </div>
                <div className="list">
                    <ul className="listdata" style={{width: (window.innerWidth-250)+"px"}}>
                        {itemsco}
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
