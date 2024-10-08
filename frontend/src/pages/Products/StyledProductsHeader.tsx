import { styled } from '@mui/material';

const StyledProductsHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  '& .filterButtons': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'space-between',

    '& .filterItem': {
      color: 'white',
      fontSize: '1.6rem',
      position: 'relative',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      '&::before, &::after': {
        position: 'absolute',
        width: '100%',
        height: '1px',
        background: 'white',
        top: '100%',
        left: 0,
        pointerEvents: 'none',
      },
      '&::before': {
        content: '""',
        transformOrigin: '50% 100%',
        transition: 'clip-path 0.3s, transform 0.3s cubic-bezier(0.2, 1, 0.8, 1)',
        clipPath:
          'polygon(0% 0%, 0% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 100% 100%, 100% 0%)',
      },
      '&:hover::before': {
        transform: 'translate3d(0, 2px, 0) scale3d(1.08, 2, 1)',
        clipPath:
          'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 50% 100%, 0 100%, 100% 100%, 100% 0%)',
      },
      '& span': {
        textTransform: 'capitalize',
        display: 'inline-block',
        transition: 'transform 0.3s cubic-bezier(0.2, 1, 0.8, 1)',
      },
      '&:hover span': {
        transform: 'translate3d(0, -2px, 0)',
      },
      '&.active': {
        color: 'white',
        '&::before, &::after': {
          background: 'white',
          transform: 'translate3d(0, 2px, 0) scale3d(1.08, 2, 1)',
          clipPath:
            'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 50% 100%, 0 100%, 100% 100%, 100% 0%)',
        },
        '& span': {
          transform: 'translate3d(0, -2px, 0)',
        },
      },
    },

    [theme.breakpoints.down('sm')]: {
      width: '320px',
      gap: '1rem',
      '& .filterItem': {
        color: 'white',
        fontSize: '1.4rem',
      },
    },
  },

  '& .searchBox': {
    width: 320,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
}));

export default StyledProductsHeader;
