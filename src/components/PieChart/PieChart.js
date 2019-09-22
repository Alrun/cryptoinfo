import React, { useState } from 'react';
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

const setColors = () => {
  const mainColor = [
    '#f0f0f0'
  ];
  const grade = 6;

  let colors = [];

  for (let i = 0; i < mainColor.length; i++) {
    let num = 0;
    for (let j = 0; j < grade; j++) {
      colors.push(lightenDarkenColor(mainColor[i], num));
      num -= 11;
    }
  }

  // console.log(colors);

  return colors;
};

// setColors(colors, 3);

// console.log(COLORS);

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
  const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, name, value} = props;
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
      {/*<text x={ cx } y={ cy } dy={ 8 } textAnchor="middle" fill="#000">{ payload.name }</text>*/}
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

export default function PieChart(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const {data, fiat, fiatSymbol} = props;

  const handlePieEnter = (data, index) => {
    setActiveIndex(index);
  };



  // console.log(fiat, fiatSymbol);

  return (
    <Box>
      <Box>
      { `${ fiat === 'btc' ? sum(data, 'value').toFixed(8) : decimalFormat(sum(data, 'value'), 2) } ${ fiatSymbol }` }
      </Box>
      <ResponsiveContainer width={ 400 } height={ 400 }>

        <PC
          // width="100%" height="100%"
        >
          <Pie
            data={ data }
            // cx={ 200 }
            // cy={ 200 }
            innerRadius={ 70 }
            outerRadius={ 90 }
            fill="#8884d8"
            dataKey="value"
            paddingAngle={ 1 }
            activeIndex={ activeIndex }
            activeShape={ renderActiveShape }
            onMouseEnter={ handlePieEnter }
            // labelLine={ false }
            // label={ renderCustomizedLabel }
          >
            {
              data.map((entry, index) => <Cell key={ `cell-${ index }` }
                                               fill={ setColors()[index % setColors().length] } />)
            }
          </Pie>
        </PC>
      </ResponsiveContainer>
    </Box>

  );
}
