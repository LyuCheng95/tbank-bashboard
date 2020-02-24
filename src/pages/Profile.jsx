import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import ProfileTabPanel from '../components/ProfileTabPanel';
const useStyles = makeStyles(theme => ({
  introCard: {
    height: '600px',
    marginTop: '100px',
    overflow: 'visible',
    borderRadius: '40px'
  },
  avatar: {
    transform: 'translateY(-70px)',
    margin: '0 auto',
    height: '150px',
    width: '150px',
    fontSize: '80px',
    borderStyle: 'double',
    borderWidth: '5px'
  },
  name: {
    fontFamily: 'Roboto Slab',
    textAlign: 'center',
    color: '#555',
    transform: 'translateY(-50px)',
  },
  occupation: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#777',
    transform: 'translateY(-43px)'
  },
}));

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const profile = JSON.parse(sessionStorage.getItem('profile'));
  return (
    <Grid container direction="column" spacing={5}>
      <Card className={classes.introCard}>
        <Grid item>
          <Avatar className={classes.avatar}>
            {profile.givenName.charAt(0) + profile.familyName.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography className={classes.name} variant={'h5'}>
            {profile.givenName + ' ' + profile.familyName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.occupation} >
            {profile.profile.occupation.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item>
          <ProfileTabPanel />
        </Grid>
      </Card>
    </Grid>
  );
}
