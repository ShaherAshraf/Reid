import { TextField, Typography } from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PageContainer from '../../components/PageContainer';
import emailjs from '@emailjs/browser';
import { FormEvent, MutableRefObject, useRef } from 'react';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import StyledContactPage from './StyledContactPage';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const form: MutableRefObject<HTMLFormElement> | undefined = useRef(undefined!);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const MotionTextField = motion(TextField);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm('contact_service', 'contact_form', form?.current, 'id3FMtC8zl1lcfPDr').then(
      (result) => {
        console.log(result.text);
        if (result.status == 200) {
          form.current.reset();
          dispatch(
            openToast({
              type: 'success',
              message: t('YourMessageSentSuccessfully'),
            })
          );
        }
      },
      (error) => {
        console.log(error.text);
        if (error)
          dispatch(
            openToast({
              type: 'error',
              message: t('SomeErrorHappened'),
            })
          );
      }
    );
  };

  const titleVariants = {
    initial: {
      opacity: 0,
      y: '10rem',
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <PageContainer>
      <StyledContactPage>
        <div className='contact'>
          <div className='formContainer'>
            <form ref={form} onSubmit={sendEmail}>
              <Typography
                variant='h5'
                sx={{ fontSize: '2.8rem !important', fontWeight: 'bold', color: 'white' }}
                component={motion.h5}
                variants={titleVariants}
                initial='initial'
                animate='animate'
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {t('SendUsAMessage')}
              </Typography>
              <MotionTextField
                required
                id='outlined-required'
                label={t('YourEmailAddress')}
                type='email'
                name='user_email'
                sx={{ width: '100%' }}
                variants={titleVariants}
                initial='initial'
                animate='animate'
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <MotionTextField
                id='outlined-multiline-static'
                label={t('HowCanWeHelp')}
                type='text'
                name='user_message'
                multiline
                rows={6}
                required
                sx={{ width: '100%' }}
                variants={titleVariants}
                initial='initial'
                animate='animate'
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <StyledButton
                type='submit'
                className='submitBtn'
                component={motion.button}
                whileTap={{ scale: 0.95 }}
                variants={titleVariants}
                initial='initial'
                animate='animate'
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t('Submit')}
              </StyledButton>
            </form>
          </div>
          <div className='contactInfo'>
            <motion.div
              className='address'
              variants={titleVariants}
              initial='initial'
              animate='animate'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className='title'>
                <LocationOnOutlinedIcon />
                <p>{t('Address')}</p>
              </div>
              <p className='text'>
                Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
              </p>
            </motion.div>
            <motion.div
              className='talk'
              variants={titleVariants}
              initial='initial'
              animate='animate'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className='title'>
                <LocalPhoneOutlinedIcon />
                <p>{t('LetsTalk')}</p>
              </div>
              <p className='text'>+1 800 1236879</p>
            </motion.div>
            <motion.div
              className='support'
              variants={titleVariants}
              initial='initial'
              animate='animate'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className='title'>
                <EmailOutlinedIcon />
                <p>{t('SaleSupport')}</p>
              </div>
              <p className='text'>contact@example.com</p>
            </motion.div>
          </div>
        </div>
        <div className='map'>
          <iframe src='https://www.openstreetmap.org/export/embed.html?bbox=30.86746215820313%2C29.685666670118724%2C31.91940307617188%2C30.38235321766959&amp;layer=mapnik'></iframe>
          <br />
          <small className='mapBtn'>
            <a href='https://www.openstreetmap.org/#map=10/30.0346/31.3934' target='_blank'>
              <StyledButton>{t('ViewLargerMap')}</StyledButton>
            </a>
          </small>
        </div>
        <Toast />
      </StyledContactPage>
    </PageContainer>
  );
};

export default ContactUs;
