import React from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-desktop/windows';
import ChartXY from './chartxy';
import _ from 'lodash';

class ChartShow extends React.Component {

    render() {
        const {currealtimedatalist,isverifydata,verifydataflag,verifydata} = this.props;
        const contentheight = window.innerHeight - 150;
        const height = contentheight*0.5;
        const width = (window.innerWidth-242)*0.8;

        let lines = [];
        let labels_data = [];
        let isnodata = false;
        if(isverifydata){//校验数据
          let currealtimedata = verifydata[verifydataflag];
          isnodata = !currealtimedata;
          if(!isnodata){
            const {rawdata_55,rawdata_ee} = currealtimedata;
            const data_55 = _.slice(rawdata_55,50,250);
            const data_ee = _.slice(rawdata_ee,50,250);
            let tee = 0;
            let linedata = [];

            _.map(data_55,(v,index)=>{
              tee = tee + data_ee[index];
              linedata.push({x:v,y:tee});
            });
            const line_y_max = _.maxBy(linedata,'y');
            const line_y_min = _.minBy(linedata,'y');
            _.map(linedata,(lineobj,index)=>{
              if(lineobj.y === line_y_max.y && lineobj.x === line_y_max.x){
                labels_data.push({
                  x:lineobj.x,
                  y:lineobj.y,
                  label: `${lineobj.x},${lineobj.y}`
                });
              }
              if(lineobj.y === line_y_min.y && lineobj.x === line_y_min.x){
                labels_data.push({
                  x:lineobj.x,
                  y:lineobj.y,
                  label: `${lineobj.x},${lineobj.y}`
                });
              }
            })
            lines.push({
              data:linedata,
              color:'#' + parseInt(Math.random() * 0xffffff).toString(16)
            });
          }
        }
        else{
          isnodata = currealtimedatalist.length === 0;
          if(!isnodata){
            _.map(currealtimedatalist,(currealtimedata)=>{
              const {rawdata_55,rawdata_ee} = currealtimedata;
              let data_vt;
              let teeverifydata = verifydata[currealtimedata.verifydataflag];
              if(!!teeverifydata){
                let data_v = _.slice(teeverifydata.rawdata_ee,50,250);
                let tee = 0;
                data_vt=[];
                _.map(data_v,(v,index)=>{
                  tee = tee + data_v[index];
                  data_vt.push(tee);
                });
              }

              const data_55 = _.slice(rawdata_55,50,250);
              const data_ee = _.slice(rawdata_ee,50,250);
              let tee = 0;
              let linedata = [];

              _.map(data_55,(v,index)=>{
                tee = tee + data_ee[index];
                let teetmp = tee;
                if(!!data_vt){
                  teetmp -= data_vt[index];
                }
                linedata.push({x:v,y:teetmp});
              });
              const line_y_max = _.maxBy(linedata,'y');
              const line_y_min = _.minBy(linedata,'y');
              _.map(linedata,(lineobj,index)=>{
                if(lineobj.y === line_y_max.y && lineobj.x === line_y_max.x){
                  labels_data.push({
                    x:lineobj.x,
                    y:lineobj.y,
                    label: `${lineobj.x},${lineobj.y}`
                  });
                }
                if(lineobj.y === line_y_min.y && lineobj.x === line_y_min.x){
                  labels_data.push({
                    x:lineobj.x,
                    y:lineobj.y,
                    label: `${lineobj.x},${lineobj.y}`
                  });
                }
              })
              lines.push({
                data:linedata,
                color:'#' + parseInt(Math.random() * 0xffffff).toString(16)
              });
            });
          }
        }
        if(isnodata){
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
        console.log(`lines:${JSON.stringify(lines)}`);
        return (
            <ChartXY height={height} width={width} lines={lines} labels_data={labels_data}/>
        );
    }
}

const mapStateToProps = ({serialportdata}) => {
    const {currealtimedatalist,isverifydata,verifydataflag,verifydata} = serialportdata;
    return {currealtimedatalist,isverifydata,verifydataflag,verifydata};
};

export default connect(mapStateToProps)(ChartShow);
// export default ChartShow;
