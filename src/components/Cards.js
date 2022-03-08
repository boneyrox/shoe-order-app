import React from "react";
export function Cards({ title, price, shoe, image, id }) {
    return <div className="item" key={id}>
        <div className="img-title">
            {title}
        </div>
        <div className="img-name">
            {shoe}
        </div>
        <img className="productImage" src={image} />
        <div className="price">
            Price
        </div>
        <div className="dollars">
            $ {price}
        </div>
    </div>;
}
