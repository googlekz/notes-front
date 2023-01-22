import React from 'react';
import "./UiDelete.scss"
const UiDelete = ({onClick, className}: any) => {
    return (
        <button
            className={`ui-delete ${className}`}
            onClick={onClick}
        >X</button>
    );
};

export default UiDelete;