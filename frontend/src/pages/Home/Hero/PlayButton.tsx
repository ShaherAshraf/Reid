import { Modal, styled } from '@mui/material';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Spinner } from '../../../components/Spinners';

const PlayIcon = styled(motion(PlayCircleRoundedIcon))(({ theme }) => ({
  width: 75,
  height: 75,
  padding: '1rem',
  borderRadius: '100%',
  color: 'white',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(146, 104, 186, 0.5)',
  [theme.breakpoints.up('sm')]: {
    width: 80,
    height: 80,
  },
  [theme.breakpoints.up('md')]: {
    width: 90,
    height: 90,
  },
  [theme.breakpoints.up('lg')]: {
    width: 110,
    height: 110,
  },
}));

const StyledPlayButton = styled(motion.div)(({ theme }) => ({
  width: 76,
  height: 76,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '100%',
  cursor: 'pointer',
  position: 'absolute',
  top: '6rem',
  right: '-5.5rem',
  [theme.breakpoints.up('sm')]: {
    width: 81,
    height: 81,
    top: '6.5rem',
    right: '-6rem',
  },
  [theme.breakpoints.up('md')]: {
    width: 91,
    height: 91,
    top: '7rem',
    right: '-5.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    width: 112,
    height: 112,
    top: '7rem',
    right: '-7.5rem',
  },
}));

const PlayButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledPlayButton
        initial={{
          opacity: 0,
          scale: 0,
          backgroundImage: 'linear-gradient(90deg, white 5%, #664982 100%)',
        }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ backgroundImage: 'linear-gradient(270deg, white 5%, #664982 50%)' }}
        whileTap={{ scale: 0.9 }}
        transition={{ scale: { duration: 0.5, delay: 0.8 } }}
        onClick={handleOpen}
      >
        <PlayIcon whileTap={{ scale: 0.8, outline: 0 }} transition={{ duration: 0.5 }} />
      </StyledPlayButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div
          className='player-wrapper'
          onClick={handleClose}
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ReactPlayer
            className='react-player'
            url='https://youtu.be/Okjz1CmhLSw'
            width='70%'
            height='75%'
            controls={true}
            playing={true}
            fallback={<Spinner />}
          />
        </div>
      </Modal>
    </>
  );
};

export default PlayButton;
