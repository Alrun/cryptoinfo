import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {default as TR} from '@material-ui/core/TableRow';

export default function TableRow({rowData: {labelId, row}}) {
  return (
    <TR
      tabIndex={ -1 }
    >
      <TableCell
        component="th"
        id={ labelId }
        scope="row"
      >
        { row.name }
      </TableCell>
      <TableCell align="right">{ row.calories }</TableCell>
      <TableCell align="right">{ row.fat }</TableCell>
      <TableCell align="right">{ row.carbs }</TableCell>
      <TableCell align="right">{ row.protein }</TableCell>
      <TableCell align="right" padding="none">...</TableCell>
    </TR>
  );
}