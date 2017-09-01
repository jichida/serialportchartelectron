import React from 'react';
import {connect} from 'react-redux';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis} from 'react-vis';

import _ from 'lodash';
import { View, Text } from 'react-desktop/windows';

class ChartShow extends React.Component {

    render() {
        const {line1,line2} = this.props;
        const line1_x_max = _.maxBy(line1,'x');
        const line1_x_min = _.maxBy(line1,'x');
        const line2_x_max = _.maxBy(line2,'x');
        const line2_x_min = _.maxBy(line2,'x');

        const line1_y_max = _.maxBy(line1,'y');
        const line1_y_min = _.maxBy(line1,'y');
        const line2_y_max = _.maxBy(line2,'y');
        const line2_y_min = _.maxBy(line2,'y');

        const x_max = _.max(line1_x_max,line2_x_max);
        const x_min = _.min(line1_x_min,line2_x_min);
        const y_max = _.max(line1_y_max,line2_y_max);
        const y_min = _.min(line1_y_min,line2_y_min);

        const {height,width} = this.props;

        return (
          <XYPlot   height={height}  width={width}
            ticks = {{stroke: '#FF0000'}}
            text={{stroke: '#FF0000', fill: '#6b6b76', fontWeight: 600}}
            >
            <XAxis top={height/2}/>
            <YAxis left={width/2} />
            <LineSeries data={line1} color="red"/>
            <LineSeries data={line2} color="blue"/>
          </XYPlot>
        );
    }
}

export default ChartShow;
// export default ChartShow;
