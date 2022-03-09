import { Slider } from './utils/Slider';
import { useContext, useState } from "react";
import { context } from "../App";
export function Sidebar({ }) {
    // extracting the data from the context present in the App.js
    const { sizes, brands } = useContext(context);
    const [states, setStates] = useState({
        sizes: new Array(sizes.length).fill(false),
        brands: new Array(brands.length).fill(false),

    });

    return <div className="col-sidebar">
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Brands
                </h3>
            </div>
            {/* filter by brand names , has checkboxes before brand names */}
            <div className="filter-body">
                {brands.map((brand, index) => <div className="filter-item" key={index}>
                    <input type="checkbox" id={brand}
                        onChange={(e) => {
                            let newBrands = [...states.brands];
                            newBrands[index] = e.target.checked;
                            setStates({ ...states, brands: newBrands });
                        }}
                    />
                    <label htmlFor={brand}>
                        {brand}
                    </label>
                </div>)}


            </div>

        </div>
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Price Range
                </h3>
            </div>
            {/* filter by price range, has two point slider and gives min-max values */}
            <div className="filter-body">
                <Slider />

            </div>

        </div>
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Size
                </h3>
            </div>
            {/* have list of boxes with sizes in them. with added click func. that changes style */}
            <div className="size-filters">
                {sizes.map((size, index) => {
                    return <div className={
                        states.sizes[index] ? 'size-boxes box-active' : 'size-boxes'
                    } key={index} onClick={
                        () => {
                            let temp = [...states.sizes];
                            temp[index] = !temp[index];
                            setStates({ ...states, sizes: temp });
                        }
                    }   >
                        {size}
                    </div>
                })}
            </div>

            <button className="apply" >
                Apply
            </button>
        </div>
    </div>;
}
