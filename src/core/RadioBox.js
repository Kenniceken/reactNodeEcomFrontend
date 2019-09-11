import React, { useState, useEffect } from 'react';



const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);


    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value)
    }


    return prices.map((p, i) => (
        <div key={i} className="page__toggle">
            <label className="radio">
                <input
                    onChange={handleChange}
                    type="radio"
                    name={p}
                    value={`${p._id}`} />
                <span>{p.name} </span>
            </label>
        </div>
    ));
}

export default RadioBox;