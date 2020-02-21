import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HomeCarousel from '../components/HomeCarousel';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import FeatureCard from '../components/FeatureCard';
import FoodImage from '../assets/food.jpg';
import CleanImage from '../assets/clean.jpg';
import StudyImage from '../assets/study.png';
import AttendanceImage from '../assets/attendance.jpg';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  introCard: {
    height: '600px',
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item xs={12}>
        <Card className={classes.introCard}>
          <Grid container>
            <Grid item xs={7}>
              <HomeCarousel />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FeatureCard
              image={FoodImage}
              title='餐饮'
              onClick={() => history.push('/food')}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                izards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                            </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={3}>
            <FeatureCard
              image={CleanImage}
              title='卫生'
              onClick={() => history.push('/clean')}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                            </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={3}>
            <FeatureCard
              image={StudyImage}
              title='学习'
              onClick={() => history.push('/study')}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                            </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={3}>
            <FeatureCard
              image={AttendanceImage}
              title='出勤'
              onClick={() => history.push('/attendance')}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                            </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={3}>
            <Card>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}