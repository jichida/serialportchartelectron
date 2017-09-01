import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Button } from 'antd';
import Seltime from './seltime';
import { Pagination } from 'antd';
import "../antd.min.css";
import "../historydata.css";

let list = ["0","1","0","1","0","1","0","1","0"];

class Historydata extends React.Component {
    render() {
        
        return (
            <div style={{width : "100%"}}>
                <div style={{display:"flex"}}>
                    <Seltime />
                    <Button type="primary" icon="search" style={{marginLeft:"10px"}}>查询</Button>
                </div>
                <div className="list">
                    <ul className="listdata">
                        {
                            _.map(list, (index, key)=>{
                                return <li key={key}>{key}</li>
                            })
                        }
                    </ul>
                    <Pagination defaultCurrent={0} total={500} />
                </div>
            </div>
        );
    }
}


export default connect()(Historydata);
