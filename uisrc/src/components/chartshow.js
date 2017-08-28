import React from 'react';
import {connect} from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import _ from 'lodash';
import { View, Text } from 'react-desktop/windows';

class ChartShow extends React.Component {
    componentWillMount () {

    }
    componentWillUnmount(){

    }
    componentDidMount () {
    }
    render() {
        const {isgetdata,chartdata} = this.props;
        if(!isgetdata){
            return (<View
                 color='#cc7f29'
                 background
                 padding="20px"
                 horizontalAlignment="center"
                 verticalAlignment="center"
                 width="200px"
                 height="100px"
               >
                 <Text color={'#333'}>暂无数据</Text>
               </View>
             );
        }
        return (
          <LineChart width={600} height={300} data={chartdata}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
           <Legend />
           <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        );
    }
}

const mapStateToProps = ({serialportdata}) => {
  const {isgetdata,currealtimedata} = serialportdata;
  return {isgetdata,...currealtimedata};
};

export default connect(mapStateToProps)(ChartShow);

// export default ChartShow;
