import React from 'react'
import { useSwiperSlide } from 'swiper/react';

export default function CommonSlide(props) {
    
    const swiperSlide = useSwiperSlide();

    const slideTitles = [
        "“Die da unten haben seit Tagen Nebel. Das muss kacke sein. Besonders in Torrox.”",
        "“Hier hat Dalí gewohnt.” “Wer?” “Dalí, der Künstler!” “Kenn ich nicht.”",
        "“Ich hatte keine Ahnung, dass Spanien so bergig ist. Ich dachte, hier sei alles platt.”",
        "“Endlich keine Prozessionsspinner mehr, die Matze umbringen können.”",
        "“So ein Haus möchte ich auch. Das können wir uns bestimmt selber bauen.”",
        "“Das da ist der Duomo Nuovo, der neue Dom.” “Wieso neu?” “Weil der Dom daneben älter ist.”",
        "“Ehy, lass mal coole Vogelbilder machen.“",
        "“Wer nennt seinen Hund eigentlich Heavy Metal?“"
    ]

    const slideLocation = [
        "Cómpeta, Andalusien, Spanien",
        "Cadaqués, Katalonien, Spanien",
        "Cómpeta, Andalusien, Spanien",
        "Brescia, Lombardei, Italien",
        "Cómpeta, Andalusien, Spanien",
        "Brescia, Lombardei, Italien",
        "Málaga, Andalusien, Spanien",
        "Cadaqués, Katalonien, Spanien",
    ]

    return (
        <>
            <img src={props.img}  className="swiper__slide--img" alt=''></img>
            {swiperSlide.isActive && <p className='swiper--title'> {slideTitles[props.slidenum]}</p>}
            {swiperSlide.isActive && <p className='swiper--location'> {slideLocation[props.slidenum]}</p>}
        </>
    );
    }