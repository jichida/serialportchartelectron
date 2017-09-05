import React from 'react';
import {connect} from 'react-redux';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries,LabelSeries,XAxis,YAxis} from 'react-vis';

import _ from 'lodash';
import { View, Text } from 'react-desktop/windows';

class ChartShow extends React.Component {

    render() {
        let {lines,labels_data} = this.props;
        const {height,width} = this.props;
        lines = lines || [];

        return (
            <XYPlot
                height={height}
                width={width}
                background = "#FFF"
                text={{stroke: '#FF0000', fill: '#6b6b76', fontWeight: 600}}
                >
                <XAxis top={height/2}/>
                <YAxis left={width/2} />
                {
                  _.map(lines,(lineobj,index)=>{
                    return  <LineSeries data={lineobj.data} color={lineobj.color} key={index}/>
                  })
                }
                {
                 labels_data && <LabelSeries data={labels_data}/>
                }
            </XYPlot>
        );
    }
}

export default ChartShow;
// export default ChartShow;
