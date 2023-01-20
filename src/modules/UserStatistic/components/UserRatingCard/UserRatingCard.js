import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { taskCounter } from '../../UserStatistic';

export default function UserRatingCard() {

  let { doneCounter } = useContext(taskCounter);

  const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };

  const calcRating = (num) => {
    let result = 0;
    if(num === 10 || num < 10){return result = 0.5}
    if(num === 20){return result = 1}
    if(num === 30){return result = 1.5}
    if(num === 40){return result = 2}
    if(num === 50){return result = 2.5}
    if(num === 60){return result = 3}
    if(num === 70){return result = 3.5}
    if(num === 80){return result = 4}
    if(num === 90){return result = 4.5}
    if(num === 100){return result = 5}
    return result;
  }

  let value = calcRating(doneCounter);
  
  return (
    <div className='statistic-box user-rating'>
        <div className='statistic-title'>Rating</div>
        <Rating
            name="text-feedback"
            value={value}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        /><div style={{ color: 'grey' }}>{labels[value]}</div>
    </div>
  )
}
