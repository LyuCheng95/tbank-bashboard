import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ProfileTabPanel from '../components/ProfileTabPanel';
import { getMonthlyBalanceTrend } from '../tBankApi';
import { ResponsiveLine } from '@nivo/line'
const useStyles = makeStyles(theme => ({
  introCard: {
    marginTop: '80px',
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
  const profile = JSON.parse(sessionStorage.getItem('profile'));
  const [balanceHistory, setBalanceHistory] = useState([])
  useEffect(() => {
    const userID = sessionStorage.getItem('username');
    const PIN = sessionStorage.getItem('password');
    const OTP = sessionStorage.getItem('OTP');
    const accountID = sessionStorage.getItem('accountID');
  }, []);
  const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
      <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
      <circle
        r={size / 5}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );
  let data = JSON.parse(sessionStorage.getItem('balanceHistory'))['balance'];
  data = data.map(acc => ({
    id: acc.id,
    data: acc.data.map(mon => ({
      x: mon.Year_Month,
      y: parseInt(mon.Balance)
    }))
  }));
  const balanceLineChart = data => {
    return (
      <ResponsiveLine
        width={500}
        height={500}
        margin={{ top: 90, right: 20, bottom: 10, left: 80 }}
        animate={true}
        enableSlices={'x'}
        curve="monotoneX"
        data={data}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
        }}
        axisLeft={{
          legend: 'SGD',
          legendOffset: 12,
        }}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 2 days',
          legend: 'Time',
          legendOffset: -12,
        }}
        curve='monotoneX'
        enablePointLabel={true}
        pointSymbol={CustomSymbol}
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
        enableSlices={'x'}
        sliceTooltip={({ slice }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
            }}
          >
            {slice.points.map(point => {
              return (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0',
                  }}
                >
                  <strong>
                    Account:
                  </strong>
                  <strong>
                    {point.serieId.substr(point.serieId.length - 4)}
                  </strong>
                  <br />
                  Time:
                  {point.data.xFormatted}
                  <br />
                  balance:
                  ${point.data.yFormatted}
                </div>
              );
            })}
          </div>
        )}
      />
    )
  };
  return (
    <Card className={classes.introCard}>
      <Grid container direction="row">
        <Grid item xs={6}>
          {balanceLineChart(data)}
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" >
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
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
