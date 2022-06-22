// import Swiper core and required modules
import {Pagination, A11y, Keyboard, Mousewheel} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

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
  return (
    <Swiper
      // install Swiper modules

      className='swiper'
      modules={[Pagination, A11y, Keyboard, Mousewheel]}
      spaceBetween={10}
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
            <img src={slider1}  className="swiper__slide--img" alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <img src={slider2}  className="swiper__slide--img" alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide'>
            <img src={slider3}  className="swiper__slide--img" alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <img src={slider4}  className="swiper__slide--img" alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide'>
            <img src={slider5}  className="swiper__slide--img" alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <img src={slider6}  className="swiper__slide--img" alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide'>
            <img src={slider7} className="swiper__slide--img"  alt=''></img>
      </SwiperSlide>
      <SwiperSlide className='swiper__slide swiper__slide--width'>
            <img src={slider8} className="swiper__slide--img"  alt=''></img>
      </SwiperSlide>
    </Swiper>
  );
};
