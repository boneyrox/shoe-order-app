import { Sidebar } from './Sidebar';
import { Cards } from './Cards';
import React from "react";
export function Main({ list, loading }) {
    return <div className="container">

        <Sidebar />
        <div className="col-items">
            <div className="product-header">
                <h2>
                    New Arrivals
                </h2>
                <div>
                    Sort by
                </div>

            </div>
            <div className="products">
                {loading ?
                    <div className="loader"></div>
                    :
                    list && list[0] ? list.map((item, index) => {
                        if (index < 25) {
                            return <Cards key={item.id} title={item.shoe} price={item.retailPrice} shoe={item.name} image={item.media.smallImageUrl} id />
                        }
                    }
                    )
                        :

                        <div className="no-result">No result </div>


                }
            </div>
        </div>




    </div>;
}
