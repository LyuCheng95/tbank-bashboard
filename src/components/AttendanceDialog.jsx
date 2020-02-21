import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import WcIcon from '@material-ui/icons/Wc';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { person, attendance } from '../api';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  listItem: {
    width: '200px',
    '&:hover': {
      backgroundColor: '#e8e8e8',
    }
  },
  formControl: {
    marginRight: '20px',
  },
  deleteButton: {
    height: '42px',
    width: '42px',
  },
  nameInput: {
    width: '60%'
  },
});

export default function AttendanceDialog(props) {
  const classes = useStyles();
  const { onClose, open, personList, date, attendanceList, setAttendanceList, setAlertData } = props;
  const personDict = {};
  personList.forEach(p => {
    personDict[p[0]] = p[1];
  });
  const staffList = attendanceList.filter(rec => personDict[rec[0]] === 'staff').sort();
  const studentList = attendanceList.filter(rec => personDict[rec[0]] === 'student').sort();
  const [processing, setProcessing] = useState(false);
  const handleClose = () => {
    onClose();
  };
  const handleChange = rec => {
    if (rec[2] === '0') {
      setProcessing(true);
      attendance('update', { 'date': date.toISOString().split('T')[0], 'data': rec[0] + ',' + '-1' }).then(
        response => {
          setProcessing(false);
          setAttendanceList([...attendanceList.filter(att => att[0] !== rec[0]), [rec[0], rec[1], '-1']]);
        }
      );
    } else {
      setProcessing(true);
      attendance('update', { 'date': date.toISOString().split('T')[0], 'data': rec[0] + ',' + '0' }).then(
        response => {
          setProcessing(false);
          setAttendanceList([...attendanceList.filter(att => att[0] !== rec[0]), [rec[0], rec[1], '0']]);
        }
      );
    }
  };
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">计划出席</DialogTitle>
      <Grid container direction='column'>
        <Grid item>
          <Grid container>
            <Grid item>
              <List>
                {staffList.map(person => (
                  <ListItem className={classes.listItem} key={person}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <LocalLibraryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={person[0]} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={person[2] === '-1' || person[2] === '1'}
                        onChange={() => handleChange(person)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item>
              <List>
                {studentList.map(person => (
                  <ListItem className={classes.listItem} key={person}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <WcIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={person[0]} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={person[2] === '-1' || person[2] === '1'}
                        onChange={() => handleChange(person)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
        </Grid>
      </Grid>
    </Dialog>
  );
}