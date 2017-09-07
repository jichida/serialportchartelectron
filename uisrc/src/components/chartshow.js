import React from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-desktop/windows';
import ChartXY from './chartxy';
import _ from 'lodash';
import {getlinedata} from './getlinedata';
class ChartShow extends React.Component {

    render() {
        const {currealtimedatalist,isverifydata,verifydataflag,verifydata,isonlyfinal,isonlylast} = this.props;
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
			  tee += data_ee[index];		
              linedata.push({x:v,y:tee});
            });
            const line_y_max = _.maxBy(linedata,'y');
            const line_y_min = _.minBy(linedata,'y');
			const line_x_min = _.minBy(linedata,'x');
			let diff = line_y_max.y - line_y_min.y;

			diff = parseInt(diff);
			labels_data.push({
                  x:line_x_min.x,
                  y:line_y_max.y,
                  label: `相差:${diff}`
            });
            _.map(linedata,(lineobj,index)=>{
              if(lineobj.y === line_y_max.y && lineobj.x === line_y_max.x){
				let labely = parseInt(lineobj.y);
                labels_data.push({
                  x:lineobj.x,
                  y:lineobj.y,
                  label: `${labely}`
                });
              }
              if(lineobj.y === line_y_min.y && lineobj.x === line_y_min.x){
				let labely = parseInt(lineobj.y);  
                labels_data.push({
                  x:lineobj.x,
                  y:lineobj.y,
                  label: `${labely}`
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
            _.map(currealtimedatalist,(currealtimedata,index)=>{
                if((isonlylast && index===currealtimedatalist.length-1) || !isonlylast){
					let teeverifydata = verifydata[currealtimedata.verifydataflag];
					let result = getlinedata(currealtimedata,teeverifydata);
					let linedata = result.linedata;
					let linedatavt = result.linedatavt;
					let linedataraw = result.linedataraw;
				
					const line_y_max = _.maxBy(linedata,'y');
					const line_y_min = _.minBy(linedata,'y');
					const line_x_min = _.minBy(linedata,'x');
					diff = parseInt(diff);
					labels_data.push({
						  x:line_x_min.x,
						  y:line_y_max.y,
						  label: `相差:${diff}`
					});
					_.map(linedata,(lineobj,index)=>{
					  if(lineobj.y === line_y_max.y && lineobj.x === line_y_max.x){
						let labely = parseInt(lineobj.y);
						labels_data.push({
						  x:lineobj.x,
						  y:lineobj.y,
						  label: `${labely}`
						});
					  }
					  if(lineobj.y === line_y_min.y && lineobj.x === line_y_min.x){
						  let labely = parseInt(lineobj.y);
						labels_data.push({
						  x:lineobj.x,
						  y:lineobj.y,
						  label: `${labely}`
						});
					  }
					})
					lines.push({
					  data:linedata,
					  color:'#' + parseInt(Math.random() * 0xffffff).toString(16)
					});
					if(!isonlyfinal){
					  lines.push({
						data:linedatavt,
						color:'#' + parseInt(0xff0000).toString(16)
					  });
					  lines.push({
						data:linedataraw,
						color:'#' + parseInt(0X0000ff).toString(16)
					  });
					}
				  }
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
        console.log(`=====>${JSON.stringify(lines)}`);
        return (
            <ChartXY height={height} width={width} lines={lines} labels_data={labels_data}/>
        );
    }
}

const mapStateToProps = ({serialportdata}) => {
    const {currealtimedatalist,isverifydata,verifydataflag,verifydata,isonlyfinal,isonlylast} = serialportdata;
    return {currealtimedatalist,isverifydata,verifydataflag,verifydata,isonlyfinal,isonlylast};
};

export default connect(mapStateToProps)(ChartShow);
// export default ChartShow;
