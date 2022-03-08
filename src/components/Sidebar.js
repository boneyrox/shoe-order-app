import React from "react";
export function Sidebar({ }) {
    return <div className="col-sidebar">
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Brands
                </h3>
            </div>
            {/* filter by brand names , has checkboxes before brand names */}
            <div className="filter-body">
                <div className="filter-item">
                    <input type="checkbox" id="nike" />
                    <label htmlFor="nike">
                        Nike
                    </label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="adidas" />
                    <label htmlFor="adidas">

                        Adidas
                    </label>
                </div>
            </div>

        </div>
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Price Range
                </h3>
            </div>

        </div>
        <div className="filter">
            <div className="filter-header">
                <h3>
                    Size
                </h3>
            </div>

        </div>
    </div>;
}
