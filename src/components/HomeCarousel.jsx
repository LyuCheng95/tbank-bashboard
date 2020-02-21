import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel'
import terrace1 from '../assets/terrace1.jpg';
import terrace2 from '../assets/terrace2.jpg';
import terrace3 from '../assets/terrace3.jpg';
import terrace4 from '../assets/terrace4.jpg';
import terrace5 from '../assets/terrace5.jpg';
import terrace6 from '../assets/terrace6.jpg';
import terrace7 from '../assets/terrace7.jpg';
import terrace8 from '../assets/terrace8.jpg';
import terrace9 from '../assets/terrace9.jpg';
import terrace10 from '../assets/terrace10.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles(theme => ({
  image:{
    height:'450px'
  }
}));

export default function HomeCarousel() {
  const classes = useStyles();
  const images = [
    { id: 1, src:  terrace1 , title: '标题', content: '介绍' },
    { id: 2, src:  terrace2 , title: '标题', content: '介绍' },
    { id: 3, src:  terrace3 , title: '标题', content: '介绍' },
    { id: 4, src:  terrace4 , title: '标题', content: '介绍' },
    { id: 5, src:  terrace5 , title: '标题', content: '介绍' },
    { id: 6, src:  terrace6 , title: '标题', content: '介绍' },
    { id: 7, src:  terrace7 , title: '标题', content: '介绍' },
    { id: 8, src:  terrace8 , title: '标题', content: '介绍' },
    { id: 9, src: terrace9 , title: '标题', content: '介绍' },
    { id: 10, src:  terrace10 , title: '标题', content: '介绍' },
  ];
  return (
    <Carousel>
      {images.map(image => {
        return (
          <Carousel.Item key={images.id} className={classes.image}>
            <img
              className="d-block w-100"
              src={image.src}
              alt="image missing"
            />
            <Carousel.Caption>
              <h3>{image.title}</h3>
              <p>{image.content}</p>
            </Carousel.Caption>
          </Carousel.Item>

        );
      })}
    </Carousel>
  );
}