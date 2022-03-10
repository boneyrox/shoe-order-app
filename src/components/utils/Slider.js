import { useEffect, useState, useRef, useContext } from 'react';
import { context } from "../../App";

import './Slider.css';

export function Slider({ setMinMax }) {

    const { reset } = useContext(context);
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
        setMinMax((prevState) => [parseInt(sliderOne.current.value), prevState[1]]);
    }
    function slideTwo() {
        if (parseInt(sliderTwo.current.value) - parseInt(sliderOne.current.value) <= minGap) {
            sliderTwo.current.value = parseInt(sliderOne.current.value) + minGap;
        }
        displayValTwo.current.textContent = sliderTwo.current.value;
        setMinMax((prev) => [prev[0], parseInt(sliderTwo.current.value)]);

    }
    function resetValues() {
        sliderOne.current.value = 0;
        sliderTwo.current.value = 2000;
        displayValOne.current.textContent = sliderOne.current.value;
        displayValTwo.current.textContent = sliderTwo.current.value;
        setMinMax((prev) => [0, 2000]);
    }

    useEffect(() => {
        slideOne();
        slideTwo();
        if (reset) {
            resetValues();
        }
    }, [reset])

    return (
        <div className="wrapper">
            <div className="values">
                <span ref={displayValOne}>
                    0
                </span>
                <span> ‐ </span>
                <span ref={displayValTwo}>
                    2000
                </span>
            </div>
            <div className="container-slider">
                <div className="slider-track" ref={sliderTrack} />
                <input type="range" min={0} max={2000} step={10} defaultValue={0} ref={sliderOne} onInput={slideOne} />
                <input type="range" min={0} max={2000} step={10} defaultValue={2000} ref={sliderTwo} onInput={slideTwo} />
            </div>
        </div >
    );





}
