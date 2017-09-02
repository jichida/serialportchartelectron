import React from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-desktop/windows';
import ChartXY from './chartxy';

class ChartShow extends React.Component {

    render() {
        const {isgetdata,line1,line2} = this.props;
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
        const height = contentheight;
        const width = window.innerWidth-242;
        return (
          <ChartXY height={height} width={width} line1={line1} line2={line2}/>
        );
    }
}

const mapStateToProps = ({serialportdata}) => {
    const {isgetdata,currealtimedata} = serialportdata;
    return {isgetdata,...currealtimedata};
};

export default connect(mapStateToProps)(ChartShow);
// export default ChartShow;
