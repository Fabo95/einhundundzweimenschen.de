import CommonSlide from '../Common/CommonSlide';

// import Swiper core and required modules
import {A11y, Keyboard, Mousewheel} from 'swiper';

import { Swiper, SwiperSlide, useSwiperSlide} from 'swiper/react';

import slider1 from "../images/slider1.jpg"
import slider2 from "../images/slider2.jpeg"
import slider3 from "../images/slider3.jpeg"
import slider4 from "../images/slider4.jpeg"
import slider5 from "../images/slider5.jpeg"
import slider6 from "../images/slider6.jpeg"
import slider7 from "../images/slider7.jpeg"
import slider8 from "../images/slider8.jpeg"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/keyboard";
import "swiper/css/mousewheel";


export default () => {
  const swiperSlide = useSwiperSlide();


  return (
    <Swiper
      // install Swiper modules

      className='swiper'
      modules={[A11y, Keyboard, Mousewheel]}
      spaceBetween={15}
      keyboard = {{
        enabled: true
      }}
      mousewheel={{forceToAxis: true, sensitivity: 0.1}}
      grabCursor={true}
      pagination={true}
      loop={true}
      centeredSlides ={true}
      slidesPerView={"auto"}
    >
      <SwiperSlide className='swiper__slide'>
            <CommonSlide 
            img={slider1}
            slidenum={0}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <CommonSlide 
            img={slider2}
            slidenum={1}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide'>
            <CommonSlide 
            img={slider3}
            slidenum={2}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <CommonSlide 
            img={slider4}
            slidenum={3}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide'>
            <CommonSlide 
            img={slider5}
            slidenum={4}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <CommonSlide 
            img={slider6}
            slidenum={5}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide'>
            <CommonSlide 
            img={slider7}
            slidenum={6}
            />
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <CommonSlide 
            img={slider8}
            slidenum={7}
            />
      </SwiperSlide>
    </Swiper>
  );
};
