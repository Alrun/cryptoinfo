// import TableRow from '../TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import {default as TH} from '@material-ui/core/TableHead';

const headRows = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)'},
  {id: 'calories', numeric: true, disablePadding: false, label: 'Calories'},
  {id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)'},
  {id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)'},
  {id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)'},
];

export default function TableHead({order, orderBy, classes, onRequestSort}) {
// function EnhancedTableHead(props) {
//   const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TH>
      <TableRow>
        { headRows.map(row => (
          <TableCell
            scope="row"
            key={ row.id }
            align={ row.numeric ? 'right' : 'left' }
            // padding={ row.disablePadding ? 'none' : 'default' }
            sortDirection={ orderBy === row.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === row.id }
              direction={ order }
              onClick={ createSortHandler(row.id) }
            >
              { row.label }
              { orderBy === row.id ? (
                <span className={ classes.visuallyHidden }>
                  { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                </span>
              ) : null }
            </TableSortLabel>
          </TableCell>
        )) }
      </TableRow>
    </TH>
  );
}

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };