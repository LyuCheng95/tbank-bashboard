import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PersonCard from '../components/PersonCard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import WcIcon from '@material-ui/icons/Wc';
import PersonManagementDialog from '../components/PersonManagementDialog';
import AttendanceDialog from '../components/AttendanceDialog';
import { person, attendance } from '../api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles(theme => ({
  calendar: {
    borderRadius: '5px',
    padding: '10px;',
    boxShadow: '5px 10px #888888;',
    margin: 'auto',
    width: '80%',
    fontSize: '23px',
  },
  nameCard: {
    height: '180px',
  },
  functionButtonsGrid: {
    textAlign: 'center',
  },
  cardHeader: {
    padding: '3px 20px;',
    background: 'gray',
    color: 'white;',
  },
  controlButton: {
margin: '10px 15px',
  }
}));

export default function Attendance() {
  const classes = useStyles();
  const [date, setDate] = useState(new Date);
  const [openManagementDialog, setOpenManagementDialog] = useState(false);
  const [openAttendanceDialog, setOpenAttendanceDialog] = useState(false);
  const [personList, setPersonList] = useState([])
  const [alertData, setAlertData] = useState({ open: false, severity: '', content: '' });
  const [attendanceList, setAttendanceList] = useState([]);
  const personDict = {};
  personList.forEach(p => {
    personDict[p[0]] = p[1];
  });
  const staffList = attendanceList.filter(rec => personDict[rec[0]] === 'staff').sort();
  const studentList = attendanceList.filter(rec => personDict[rec[0]] === 'student').sort();
  useEffect(() => {
    const personPromise = person('read', {}).then(response => {
      let personInfo = response.data.message
        .replace(/"/, '')
        .replace(/"/, '')
        .split(';');
      personInfo.pop();
      personInfo = personInfo.map(info => info.split(','));
      setPersonList(personInfo);
      attendance('read', { 'date': date.toISOString().split('T')[0] }).then(response => {
        let attendanceList = response.data.message
          .replace(/"/, '')
          .replace(/"/, '')
          .split(';');
        attendanceList.pop();
        attendanceList = attendanceList.map(info => info.split(','));
        personInfo.forEach(person => {
          if (!attendanceList.map(rec => rec[0]).includes(person[0])) {
            attendanceList.push([person[0], date.toISOString().split('T')[0], '0']);
          }
        });
        setAttendanceList(attendanceList);
      })
    })
  }, [date]);
  // useEffect (() => {setDate(new Date)}, []);
  // const prevAttendanceList = usePrevious(attendanceList);
  return date?(
    <>
      <Grid container>
        <Grid item xs={8}>
          <div>
            <Calendar
              className={classes.calendar}
              value={date}
              onChange={date => setDate(date)}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            direction='column'
            spacing={2}
          >
            <Grid item className={classes.functionButtonsGrid}>
              <ButtonGroup
                size="large"
                color="primary"
                variant="contained"
                className={classes.functionButtons}
              >
                <Button
                  className={classes.controlButton}
                  onClick={() => setOpenManagementDialog(true)}
                >
                  管理
                </Button>
                <Button
                  className={classes.controlButton}
                  onClick={() => setOpenAttendanceDialog(true)}
                >
                  出席
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  avatar={<LocalLibraryIcon />}
                  title='老师'
                />
                {studentList.filter(rec => rec[2] != 0).map(rec =>
                  <PersonCard
                    name={rec[0]}
                    present={rec[2]}
                    date={date}
                    attendanceList={attendanceList}
                    setAttendanceList={setAttendanceList}
                  />
                )}
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  avatar={<WcIcon />}
                  title='学生'
                />
                {staffList.filter(rec => rec[2] != 0).map(rec =>
                  <PersonCard
                    name={rec[0]}
                    present={rec[2]}
                    attendanceList={attendanceList}
                    date={date}
                    setAttendanceList={setAttendanceList}
                  />
                )}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <PersonManagementDialog
        open={openManagementDialog}
        onClose={() => setOpenManagementDialog(false)}
        personList={personList}
        setPersonList={setPersonList}
        setAlertData={setAlertData}
      />
      <AttendanceDialog
        open={openAttendanceDialog}
        onClose={() => setOpenAttendanceDialog(false)}
        attendanceList={attendanceList}
        personList={personList}
        setAttendanceList={setAttendanceList}
        setAlertData={setAlertData}
        date={date}
      />
      <Snackbar open={alertData.open} autoHideDuration={2000} onClose={() => setAlertData({ ...alertData, open: false })}>
        <Alert variant='filled' onClose={() => setAlertData({ ...alertData, open: false })} severity={alertData.severity}>
          {alertData.content}
        </Alert>
      </Snackbar>
    </>
  ):null;
}