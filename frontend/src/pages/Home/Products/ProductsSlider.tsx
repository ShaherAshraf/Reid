import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import { Button, IconButton, Theme, useMediaQuery } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { motion, stagger, useAnimate } from 'framer-motion';
import StyledIconButton from '../../../components/Buttons/StyledIconButton';
import ProductCard, { Product } from './ProductCard';
import SliderFooter from './SliderFooter';
import StyledSlider from './StyledSlider';

type ProductsSliderProps = {
  products: Product[];
};

const ProductsSlider = ({ products }: ProductsSliderProps) => {
  const sliderRef = useRef<Slider>(null!);
  const nextRef = useRef<HTMLButtonElement>(null!);
  const prevRef = useRef<HTMLButtonElement>(null!);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const [scope, animate] = useAnimate();

  const handleSlickGoTo = (e: React.MouseEvent<HTMLElement>) => {
    const index = (e.target as HTMLElement).closest('.slick-slide')?.getAttribute('data-index');
    sliderRef.current.slickGoTo(+index!, true);
  };

  const handleSlickNext = () => {
    if (!nextRef.current.classList.contains('Circle')) {
      nextRef.current.classList.add('Circle');
      prevRef.current.classList.remove('Circle');
    }
    sliderRef.current.slickNext();
    handleAnimate();
  };

  const handleSlickPrev = () => {
    if (!prevRef.current.classList.contains('Circle')) {
      prevRef.current.classList.add('Circle');
      nextRef.current.classList.remove('Circle');
    }
    sliderRef.current.slickPrev();
    handleAnimate();
  };

  const handleAnimate = async () => {
    if (matches) {
      await animate('.product-card', { scale: 0.5 });
      await animate('.product-card', { scale: 1.1 });
      await animate('.product-card', { scale: 1 }, { delay: stagger(0.0025) });
    }
  };

  const settings = {
    dots: matches ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    accessibility: true,
    centerMode: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div ref={scope}>
      <StyledSlider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onGoTo={handleSlickGoTo} />
        ))}
      </StyledSlider>
      <SliderFooter className='SliderFooter'>
        <div className='ProductDetailsButtons'>
          <StyledIconButton
            className='ProductBagBtn'
            component={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            <LocalMallOutlinedIcon sx={{ fontSize: '1.8rem' }} />
          </StyledIconButton>
          <Button
            className='ProductDetailsBtn'
            component={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Product Details
          </Button>
        </div>
        <div className='SlideButtons'>
          <IconButton ref={prevRef} className='ArrowBtn Circle' onClick={handleSlickPrev}>
            <WestIcon />
          </IconButton>
          <IconButton ref={nextRef} className='ArrowBtn' onClick={handleSlickNext}>
            <EastIcon />
          </IconButton>
        </div>
      </SliderFooter>
    </div>
  );
};

export default ProductsSlider;
