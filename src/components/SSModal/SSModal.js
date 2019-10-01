import React, { useContext, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { StoreContext } from '../../context';
import { setSpreadsheetLink } from '../../context/actions';
import { DEMO_SPREADSHEET } from '../TableContainer/TableContainer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modalHead: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 3)
  },
  modalTitle: {
    ...theme.typography.h6,
    margin: '5px auto 5px 0',
  },
  textField: {
    width: '100%',
    '& label.Mui-focused': {
      color: '#777',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#777',
    },
  },
  error: {
    color: 'red'
  },
  text: {
    fontSize: 12,
    wordBreak: 'break-all'
  }
}));

export default function SSModal(props) {
  const {dispatch} = useContext(StoreContext);
  const [value, setValue] = React.useState('');
  const [invalid, setInvalid] = React.useState(false);
  const inputEl = useRef(null);
  const classes = useStyles();
  const {open, handleClose} = props;

  const handleChange = e => {
    setInvalid(false);
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    let isValid = false;

    if (value.length) {
      if (/https:\/\/docs.google.com\/spreadsheets\/d\/\S{44}\S*/.test(value)) {
        isValid = true;
      } else {
        setInvalid(true);
      }
    } else {
      setInvalid(true);
      inputEl.current.focus();
    }

    if (isValid) {
      const sId = value.match(/d\/(\S{44})/)[1];
      dispatch(setSpreadsheetLink(sId));
      setValue('');
      handleClose();
    }
  };

  const handleClear = () => {
    setValue('');
    inputEl.current.focus();
  };

  const handleSetDemo = () => {
    dispatch(setSpreadsheetLink(DEMO_SPREADSHEET));
    localStorage.removeItem('spreadSheetLink');
    handleClose();
  };

  React.useEffect(() => {
    if (open) {
      setValue('');
      setInvalid(false);
    }
  }, [open]);

  return (
    <div>
      <Dialog open={ open } onClose={ handleClose }>
        <div className={ classes.modalHead }>
          <h2 className={ classes.modalTitle }>Add Spreadsheet</h2>
          <Button variant="outlined" size="small" onClick={ () => handleSetDemo() }>Demo</Button>
        </div>
        <DialogContent>
          <div>
            { invalid
              ? <Typography
                component="div"
                className={ classes.error }
              >
                Enter correct link!
                <Typography component="div" color="error" className={ classes.text }>
                  Example: https://docs.google.com/spreadsheets/d/1paG7wL-ZRiAHvU6QcvtISVX2ROP8NTcvslQETh8ZdRQ
                </Typography>

              </Typography>
              : <Typography component="div">
                Enter the link to your Google Spreadsheets
                  <Typography variant="body2" color="textSecondary" className={ classes.text }>
                    Example: https://docs.google.com/spreadsheets/d/1paG7wL-ZRiAHvU6QcvtISVX2ROP8NTcvslQETh8ZdRQ/edit?usp=sharing
                  </Typography>
              </Typography>
            }

          </div>
          <TextField
            inputRef={ inputEl }
            fullWidth
            autoFocus
            label="Enter your spreadsheets link"
            className={ `${ classes.textField } ${ classes.dense }` }
            margin="dense"
            onChange={ e => handleChange(e) }
            value={ value }
          />
        </DialogContent>
        <Box mx={ 2 }>

          <DialogActions>
            <Button
              variant="contained"
              className={ classes.button }
              onClick={ () => handleSubmit() }
            >
              Ok
            </Button>
            <Button
              variant="outlined"
              disabled={ !value }
              onClick={ () => handleClear() }
            >
              Clear
            </Button>
          </DialogActions>
        </Box>

      </Dialog>
    </div>
  );
}