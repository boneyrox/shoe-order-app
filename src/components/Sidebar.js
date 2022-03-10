import { useContext, useState, useEffect } from "react";

import { Slider } from './utils/Slider';
import { context } from "../App";


export function Sidebar({ }) {
    // extracting the data from the context present in the App.js
    const { sizes, brands, originalProduct, setProducts, setIsLoading, reset, setReset } = useContext(context);
    const [minMax, setMinMax] = useState([0, 2000]);
    const [states, setStates] = useState({
        sizes: new Array(sizes.length).fill(false),
        brands: new Array(brands.length).fill(false),

    });

    // function to handle the apply button click 
    function handleApply() {
        setIsLoading(true);
        let validSizes = sizes.filter((size, index) => states.sizes[index]);
        console.log("🚀 ~ file: Sidebar.js ~ line 15 ~ handleApply ~ validSizes", validSizes)
        let validBrands = brands.filter((brand, index) => states.brands[index]);

        // sort / filter the products based on the selected filters
        let filteredProducts = originalProduct.filter(product => {
            // check if the product size is in the validSizes array
            // if it is, then check if the brand is in the validBrands array
            // if it is, then check if the price is in the minMax range
            // if it is, then return the product

            let isValid = [true, true, true];

            if (validBrands.length > 0) {

                isValid[0] = validBrands.includes(product.brand.toLowerCase());
            }
            if (validSizes.length > 0) {
                isValid[1] = validSizes.includes(product.size);
                console.log("🚀 ~ file: Sidebar.js ~ line 24 ~ handleApply ~ isValid", isValid)

            }
            if (!(product.retailPrice > minMax[0] && product.retailPrice < minMax[1])) {
                isValid[2] = false;
            }


            return isValid[0] && isValid[1] && isValid[2];
        });
        setProducts(filteredProducts);
        setIsLoading(false);
        console.log("🚀 ~ file: Sidebar.js ~ line 33 ~ handleApply ~ filteredProducts", filteredProducts)

    }

    function resetFilters() {
        setStates({
            sizes: new Array(sizes.length).fill(false),
            brands: new Array(brands.length).fill(false),
        });
        setMinMax([0, 2000]);
        setReset(false);
    }
    useEffect(() => {
        if (reset) {
            resetFilters();
        }
    }, [reset]);

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
                    <input type="checkbox" id={brand} checked={states.brands[index]} onChange={(e) => {
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
                <Slider setMinMax={setMinMax} reset={reset} />

            </div>

        </div>
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Size
                </h3>
            </div>
            {/* have list of boxes with sizes in them. with added click func. that changes style on click*/}
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

            <button className="apply" onClick={handleApply} >
                Apply
            </button>
        </div>
    </div>;
}
