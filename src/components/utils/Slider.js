import { useEffect, useState, useRef } from 'react';

import './Slider.css';

export function Slider({ }) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(900);

    let sliderOne = useRef(null);
    let sliderTwo = useRef(null);
    let displayValOne = useRef(null);
    let displayValTwo = useRef(null);
    let minGap = 0;
    let sliderTrack = useRef(null);



    function slideOne() {
        if (parseInt(sliderTwo.current.value) - parseInt(sliderOne.current.value) <= minGap) {
            sliderOne.current.value = parseInt(sliderTwo.current.value) - minGap;
        }
        displayValOne.current.textContent = sliderOne.current.value;
        setMin(sliderOne.current.value);
    }
    function slideTwo() {
        if (parseInt(sliderTwo.current.value) - parseInt(sliderOne.current.value) <= minGap) {
            sliderTwo.current.value = parseInt(sliderOne.current.value) + minGap;
        }
        displayValTwo.current.textContent = sliderTwo.current.value;
        setMax(sliderTwo.current.value);

    }

    useEffect(() => {
        slideOne();
        slideTwo();
    }, [])

    return (
        <div className="wrapper">
            <div className="values">
                <span ref={displayValOne}>
                    0
                </span>
                <span> ‐ </span>
                <span ref={displayValTwo}>
                    900
                </span>
            </div>
            <div className="container-slider">
                <div className="slider-track" ref={sliderTrack} />
                <input type="range" min={0} max={2000} step={10} defaultValue={0} ref={sliderOne} onInput={slideOne} />
                <input type="range" min={0} max={2000} step={10} defaultValue={900} ref={sliderTwo} onInput={slideTwo} />
            </div>
        </div >
    );





}
