import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';

// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

import TableRow from '../_TableRow';
import TableHead from '../_TableHead';

const rows = [
  {name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Donut', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Eclair', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Frozen yoghurt', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Gingerbread', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Honeycomb', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Ice cream sandwich', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Jelly Bean', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'KitKat', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Lollipop', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Marshmallow', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Nougat', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: 'Oreo', calories: 305, fat: 3.7, carbs: 67, protein: 4.3}
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>

        <TablePagination
          rowsPerPageOptions={ [5, 10, 25] }
          component="div"
          count={ rows.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          backIconButtonProps={ {'aria-label': 'previous page'} }
          nextIconButtonProps={ {'aria-label': 'next page'} }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />

        <div className={ classes.tableWrapper }>
          <Table
            className={ classes.table }
            aria-labelledby="tableTitle"
            size="small"
          >

            <TableHead
              order={ order }
              orderBy={ orderBy }
                classes={ classes }
              onRequestSort={handleRequestSort}
            />
            {/*<EnhancedTableHead*/}
            {/*  classes={ classes }*/}
            {/*  numSelected={ selected.length }*/}
            {/*  order={ order }*/}
            {/*  orderBy={ orderBy }*/}
            {/*  onRequestSort={ handleRequestSort }*/}
            {/*  rowCount={ rows.length }*/}
            {/*/>*/}

            <TableBody>
              { stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${ index }`;

                  return (
                    <TableRow
                      key={row.name}
                      rowData={{labelId, row}}
                    />
                  );
                }) }
              {/*{ emptyRows > 0 && (*/}
              {/*  <TableRow style={ {height: 49 * emptyRows} }>*/}
              {/*    <TableCell colSpan={ 6 } />*/}
              {/*  </TableRow>*/}
              {/*) }*/}
            </TableBody>
          </Table>
        </div>

      </Paper>
    </div>
  );
}