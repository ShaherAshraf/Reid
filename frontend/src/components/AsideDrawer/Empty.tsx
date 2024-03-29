import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledButton from '../Buttons/StyledButton';
import { closeDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch } from '../../app/store';

const StyledEmpty = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& img': {
    width: '80%',
    display: 'block',
    margin: '0 auto',
  },

  '& .button': {
    margin: '0 auto',
    display: 'block',
    padding: '1rem 3rem',
    color: 'white',
    background: 'black',
    '&:hover': { background: theme.palette.primary.main },
    '& a': { color: 'white', textDecoration: 'none' },
  },
}));

const Empty = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();

  return (
    <StyledEmpty>
      <Box>
        <img src={window.origin + '/assets/pngwing.com.png'} />
        <Typography variant='h5' sx={{ textAlign: 'center', mb: '2rem' }}>
          Your {name} is empty!
        </Typography>
        <Typography variant='body1' sx={{ textAlign: 'center', mb: '2rem' }}>
          You have no items in your {name}.
          <br /> Let's go buy something!
        </Typography>
        <StyledButton className='button' onClick={() => dispatch(closeDrawer())}>
          <Link to='products'>SHOP NOW</Link>
        </StyledButton>
      </Box>
    </StyledEmpty>
  );
};

export default Empty;
