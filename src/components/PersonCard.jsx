import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {attendance} from '../api';

const useStyles = makeStyles(theme => ({
}));

export default function PersonCard(props) {
  const { name, present, attendanceList, setAttendanceList,date } = props;
  const classes = useStyles();
  const [processing, setProcessing] = useState(false);
  const handleChange = (name, present) => {
    if (present === '-1') {
      setProcessing(true);
      attendance('update', { 'date': date.toISOString().split('T')[0], 'data': name + ',' + '1' }).then(
        response => {
          setProcessing(false);
          setAttendanceList([...attendanceList.filter(att => att[0] !== name), [name , date.toISOString().split('T')[0],  '1']]);
        }
      );
    } else {
      setProcessing(true);
      attendance('update', { 'date': date.toISOString().split('T')[0], 'data': name + ',' + '-1' }).then(
        response => {
          setProcessing(false);
          setAttendanceList([...attendanceList.filter(att => att[0] !== name), [name,date.toISOString().split('T')[0], '-1']]);
        }
      );
    }
  };
  return (
    <Card className={classes.nameCard}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Checkbox
              checked={present==1}
              onChange={() => handleChange(name, present)}
              value="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </IconButton>
        }
        title={name}
      />
    </Card>

  );
}