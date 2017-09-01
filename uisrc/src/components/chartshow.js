import React from 'react';
import {connect} from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import _ from 'lodash';
import { View, Text } from 'react-desktop/windows';

class ChartShow extends React.Component {
    componentWillMount() {
    }
    componentWillUnmount(){
    }
    componentDidMount() {
    }
    render() {
        const {isgetdata,chartdata} = this.props;
        const contentheight = window.innerHeight - 150;
        if(!isgetdata){
            return (
                <View
                    padding="20px"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    width="100%"
                    height={`${contentheight}px`}
                    background="rgba(255,255,255,.5)"
                    >
                    <Text color={'#333'}>暂无数据</Text>
                </View>
            );
        }
        return (
            <LineChart 
                width={window.innerWidth-240}
                height={contentheight}
                data={chartdata}
                margin={{top: 30, right: 30, left: 20, bottom: 20}}
                style={{background: "#FFFFFF"}}
                >
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="55" stroke="#8884d8" />
                <Line type="monotone" dataKey="ee" stroke="#82ca9d" />
                <Line type="monotone" dataKey="tee" stroke="#ff0000" />
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
