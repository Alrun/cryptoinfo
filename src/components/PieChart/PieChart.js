import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PieChart as PC, Pie, Sector, Cell, ResponsiveContainer,
} from 'recharts';
import { decimalFormat, sum } from '../../utils';
import Box from '@material-ui/core/Box';

function lightenDarkenColor(color, percent) {
  let num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;

  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}

const setColors = (count) => {
  const mainColors = [
    '#dddddd'
  ];
  const grade = count;
  let colors = [];

  for (let i = 0; i < mainColors.length; i++) {
    let num = 0;
    for (let j = 0; j < grade; j++) {
      colors.push(lightenDarkenColor(mainColors[i], num));
      num -= 50 / count;
    }
  }

  return colors;
};

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//
//   if ((percent * 100).toFixed(0) > 5) {
//     return (
//       <text
//         x={ x } y={ y }
//         fill="white"
//         textAnchor={ x > cx ? 'start' : 'end' }
//         dominantBaseline="baseline"
//       >
//         {/*{ `${ (percent * 100).toFixed(0) }%` }*/ }
//         { data[index].name }
//       </text>
//     );
//   }
// };

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
      <text x={ cx } y={ cy + 20 } dy={ 8 } textAnchor="middle"
            fill="#000">{ `${ payload.fiat === 'btc' ? payload.value.toFixed(8) : decimalFormat(payload.value, 2) } ${ payload.fiatSymbol }` }</text>
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

let data = [];
let colors = [];

const ActiveShapePieChart = memo(props => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseEnter = useCallback((data, index) => {
    setActiveIndex(index);
  }, []);

  console.log(props);

  return (
    <PC width={ 600 } height={ 450 } style={ {margin: 'auto'} }>
      <Pie
        data={ data }
        innerRadius={ 135 }
        outerRadius={ 160 }
        fill="#8884d8"
        dataKey="value"
        paddingAngle={ 1 }
        activeIndex={ activeIndex }
        activeShape={ renderActiveShape }
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

  useEffect(() => {
    data = props.data;
    colors = setColors(props.data.length);
  }, [props.data]);

  return (
    <>
      { !!props.data.length &&
      <ActiveShapePieChart data={ props.data } fiatSymbol={ props.fiatSymbol } /> }
    </>
  );
}
