import { styled } from '@mui/material';
import Img1 from '../../../assets/pexels-photo-8928928.jpeg';
import Img2 from '../../../assets/pexels-photo-8928928.jpeg';
import Img3 from '../../../assets/pexels-photo-8928928.jpeg';
import Img4 from '../../../assets/Screenshot_121.png';

const StyledGridItemContainerOne = styled('div')(({ theme }) => ({
  textAlign: 'center',
  '& p': {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '1.1',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-5rem',
      top: '5rem',
    },
  },
  '& .ImagesContainer': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& img': {
    maxWidth: '10rem',
    borderRadius: '1rem',
    position: 'relative',
  },
  '& .Img1': {
    rotate: '-45deg',
    left: '-20rem',
    top: '-2rem',
    [theme.breakpoints.up('sm')]: {
      left: '-25rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-20rem',
      top: '10rem',
    },
  },
  '& .Img2': {
    rotate: '15deg',
    right: '-20rem',
    top: '-20rem',
    [theme.breakpoints.up('sm')]: {
      right: '-25rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '10rem',
      top: '-10rem',
    },
  },
  '& .Img3': {
    rotate: '45deg',
    right: '-10rem',
    top: '-20rem',
    [theme.breakpoints.up('md')]: {
      left: '10rem',
      top: '15rem',
    },
  },
  '& .Img4': {
    rotate: '5deg',
    left: '-5rem',
    top: '-30rem',
    [theme.breakpoints.up('md')]: {
      left: '-10rem',
      top: '-15rem',
    },
  },
}));

const StyledGridItemContainerTwo = styled(StyledGridItemContainerOne)(({ theme }) => ({
  '& .Img1': {
    rotate: '-20deg',
    left: '-15rem',
    top: '-30rem',
    [theme.breakpoints.up('md')]: {
      left: '-65rem',
      top: '40rem',
    },
  },
  '& .Img2': {
    rotate: '-20deg',
    right: '-22rem',
    top: '-40rem',
    [theme.breakpoints.up('sm')]: {
      right: '-30rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-40rem',
      top: '15rem',
    },
  },
  '& p': {
    textAlign: 'left',
    position: 'relative',
    top: '-45rem',
    [theme.breakpoints.up('sm')]: {
      right: '-10rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-48rem',
      top: '17rem',
    },
  },
  '& .Img3': {
    rotate: '-45deg',
    left: '-15rem',
    top: '-45rem',
    [theme.breakpoints.up('sm')]: {
      left: '-30rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '40rem',
      top: '-30rem',
    },
  },
  '& .Img4': {
    rotate: '5deg',
    left: '10rem',
    top: '-55rem',
    [theme.breakpoints.up('md')]: {
      left: '60rem',
      top: '-45rem',
    },
  },
}));

const StyledGridItemContainerThree = styled(StyledGridItemContainerTwo)(({ theme }) => ({
  '& .Img1': {
    rotate: '30deg',
    left: '-2rem',
    top: '-50rem',
    [theme.breakpoints.up('md')]: {
      left: '-10rem',
      top: '25rem',
    },
  },
  '& .Img2': {
    rotate: '45deg',
    right: '-20rem',
    top: '-65rem',
    [theme.breakpoints.up('sm')]: {
      right: '-30rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '12rem',
      top: '5rem',
    },
  },
  '& p': {
    textAlign: 'left',
    position: 'relative',
    top: '-64rem',
    left: '-5rem',
    [theme.breakpoints.up('sm')]: {
      left: '-25rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-15rem',
      top: '12rem',
    },
  },
  '& .Img3': {
    rotate: '-45deg',
    left: '-5rem',
    top: '-64rem',
    [theme.breakpoints.up('md')]: {
      left: '0rem',
      top: '12rem',
    },
  },
  '& .Img4': {
    rotate: '-30deg',
    left: '10rem',
    top: '-82rem',
    [theme.breakpoints.up('sm')]: {
      left: '20rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '10rem',
      top: '-12rem',
    },
  },
}));

export const GridItemContainerOne = () => {
  return (
    <StyledGridItemContainerOne>
      <p>Just dress and walk</p>
      <div className='ImagesContainer'>
        <img src={Img1} className='Img1' />
        <img src={Img2} className='Img2' />
        <img src={Img3} className='Img3' />
        <img src={Img4} className='Img4' />
      </div>
    </StyledGridItemContainerOne>
  );
};

export const GridItemContainerTwo = () => {
  return (
    <StyledGridItemContainerTwo>
      <div className='ImagesContainer'>
        <img src={Img1} className='Img1' />
        <img src={Img2} className='Img2' />
      </div>
      <p>
        With all the best
        <br />
        for any mood.
      </p>
      <div className='ImagesContainer'>
        <img src={Img3} className='Img3' />
        <img src={Img4} className='Img4' />
      </div>
    </StyledGridItemContainerTwo>
  );
};

export const GridItemContainerThree = () => {
  return (
    <StyledGridItemContainerThree>
      <div className='ImagesContainer'>
        <img src={Img1} className='Img1' />
        <img src={Img2} className='Img2' />
      </div>
      <p>
        With all the love for any
        <br />
        dynamic lifestyle!
      </p>
      <div className='ImagesContainer'>
        <img src={Img3} className='Img3' />
        <img src={Img4} className='Img4' />
      </div>
    </StyledGridItemContainerThree>
  );
};
