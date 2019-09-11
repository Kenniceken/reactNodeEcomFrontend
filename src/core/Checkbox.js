import React, { useState, useEffect } from 'react';


const Checkbox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([]);

    const handleCheckboxToggle = c => () => {
        // if not found in the state will return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked is not already in the state > then push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
         } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map((c, i) => (
        <div key={i} className="page__toggle">
            <label className="toggle">
                <li>
                    <input onChange={handleCheckboxToggle(c._id)} value={checked.indexOf(c._id === -1)} className="toggle__input form-check-input" type="checkbox" />
                    <span className="toggle__label">
                        <span className="toggle__text form-check-label">{c.name}</span>
                    </span>
                </li>
            </label>
        </div>
    ));
};

export default Checkbox;