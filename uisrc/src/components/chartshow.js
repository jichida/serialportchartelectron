import React from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-desktop/windows';
import ChartXY from './chartxy';
import _ from 'lodash';

class ChartShow extends React.Component {

    render() {
        const {currealtimedatalist} = this.props;
        const contentheight = window.innerHeight - 150;
        const height = contentheight*0.6;
        const width = (window.innerWidth-242)*0.8;
        if(currealtimedatalist.length === 0){
            return (
                <View
                    padding="20px"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    width={`${width}px`}
                    height={`${height}px`}
                    background="rgba(255,255,255,.5)"
                    style={{margin:"auto"}}
                    >
                    <Text color={'#333'}>暂无数据</Text>
                </View>
            );
        }
        let lines = [];
        _.map(currealtimedatalist,(currealtimedata)=>{
          const {rawdata_55,rawdata_ee} = currealtimedata;
          const data_55 = _.slice(rawdata_55,50,250);
          const data_ee = _.slice(rawdata_ee,50,250);
          let tee = 0;
          let linedata = [];
          _.map(data_55,(v,index)=>{
            tee = tee + data_ee[index];
            linedata.push({x:v,y:tee});
          });
          lines.push({
            data:linedata,
            color:'#' + parseInt(Math.random() * 0xffffff).toString(16)
          });
        });
        return (
            <ChartXY height={height} width={width} lines={lines} />
        );
    }
}

const mapStateToProps = ({serialportdata}) => {
    const {currealtimedatalist} = serialportdata;
    return {currealtimedatalist};
};

export default connect(mapStateToProps)(ChartShow);
// export default ChartShow;
