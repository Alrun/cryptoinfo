import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart as PC, Pie, Sector, Cell,
} from 'recharts';
import { decimalFormat, lightenDarkenColor } from '../../utils';

const setColors = (count) => {
  const mainColors = [
    '#eeeeee'
  ];
  const grade = count;
  let colors = [];

  for (let i = 0; i < mainColors.length; i++) {
    let num = 0;
    for (let j = 0; j < grade; j++) {
      colors.push(lightenDarkenColor(mainColors[i], num));
      num -= 30 / count;
    }
  }

  return colors.reverse();
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, name} = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={ cx }
        y={ cy + 20 }
        dy={ 8 }
        textAnchor="middle"
        fill="#999"
      >
        { `${ payload.fiat === 'btc'
              ? payload.value.toFixed(8)
              : decimalFormat(payload.value, 2) } ${ payload.fiatSymbol }` }
      </text>
      <Sector
        cx={ cx }
        cy={ cy }
        innerRadius={ innerRadius }
        outerRadius={ outerRadius }
        startAngle={ startAngle }
        endAngle={ endAngle }
        fill={ fill }
      />
      <Sector
        cx={ cx }
        cy={ cy }
        startAngle={ startAngle }
        endAngle={ endAngle }
        innerRadius={ outerRadius + 4 }
        outerRadius={ outerRadius + 6 }
        fill={ fill }
      />
      <path d={ `M${ sx },${ sy }L${ mx },${ my }L${ ex },${ ey }` } stroke={ fill } fill="none" />
      <circle cx={ ex } cy={ ey } r={ 2 } fill={ fill } stroke="none" />
      <text x={ ex + (cos >= 0 ? 1 : -1) * 12 } y={ ey } textAnchor={ textAnchor } fill="#333">{ name }</text>
      <text x={ ex + (cos >= 0 ? 1 : -1) * 12 } y={ ey } dy={ 18 } textAnchor={ textAnchor } fill="#999">
        { `(${ (percent * 100).toFixed(2) }%)` }
      </text>
    </g>
  );
};

const renderActiveShapeCompact = (props) => {
  const {cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, name} = props;

  return (
    <g>
      <text
        x={ cx }
        y={ cy }
        dy={ 8 }
        textAnchor="middle"
        fill="#777"
        fontSize="1.25rem"
        fontWeight="500"
      >
        { `${ name } (${ (percent * 100).toFixed(2) }%)` }
      </text>
      <text
        x={ cx }
        y={ cy + 20 }
        dy={ 8 }
        textAnchor="middle"
        fill="#999"
      >
        { `${ payload.fiat === 'btc'
              ? payload.value.toFixed(8)
              : decimalFormat(payload.value, 2) } ${ payload.fiatSymbol }` }
      </text>
      <Sector
        cx={ cx }
        cy={ cy }
        innerRadius={ innerRadius }
        outerRadius={ outerRadius }
        startAngle={ startAngle }
        endAngle={ endAngle }
        fill={ fill }
      />
      <Sector
        cx={ cx }
        cy={ cy }
        startAngle={ startAngle }
        endAngle={ endAngle }
        innerRadius={ outerRadius + 4 }
        outerRadius={ outerRadius + 6 }
        fill={ fill }
      />
    </g>
  );
};

let data = [];
let colors = [];

const ActiveShapePieChart = memo(props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {width, height, outer, compact} = props;

  const onMouseEnter = useCallback((data, index) => {
    setActiveIndex(index);
  }, []);

  return (
    <PC width={ width } height={ height } style={ {margin: 'auto'} }>
      <Pie
        data={ data }
        outerRadius={ outer / 2 }
        innerRadius={ outer * 0.865 / 2 }
        fill="#8884d8"
        dataKey="value"
        paddingAngle={ 1 }
        activeIndex={ activeIndex }
        activeShape={ compact ? renderActiveShapeCompact : renderActiveShape }
        onMouseEnter={ onMouseEnter }
        isAnimationActive={ true }
      >
        {
          data.map((entry, index) => (
            <Cell
              key={ `cell-${ index }` }
              fill={ colors[index % colors.length] }
            />
          ))
        }
      </Pie>
    </PC>
  );
});

export default function PieChart(props) {
  const {pieData, fiatSymbol, width, height, outer, compact} = props;

  useEffect(() => {
    data = pieData;
    colors = setColors(pieData.length);
  }, [pieData]);

  return (
    <>
      { !!props.pieData.length &&
      <ActiveShapePieChart
        pieData={ pieData }
        fiatSymbol={ fiatSymbol }
        width={ width }
        height={ height }
        outer={ outer }
        compact={ compact }
      /> }
    </>
  );
}

PieChart.propTypes = {
  pieData: PropTypes.array.isRequired,
  fiatSymbol: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  outer: PropTypes.number.isRequired,
  compact: PropTypes.bool
};