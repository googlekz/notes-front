import React from 'react';
import "./UiMenuItem.scss"
import UiDelete from "./UiDelete";
const UiMenuItem = ({ item, onClick, activeGroup, deleteGroup }: any) => {
    const getClass = () => {
        return `menu-item ${
            activeGroup?.id === item.id ? 'menu-item_active' : ''
        }`
    };

    const getCountNotes = () => {
        return item?.count_notes || null
    };

    return (
        <div className={getClass()}>
            <p
                onClick={() => onClick(item)}
                className="menu-item__text"
            >
                {
                    getCountNotes()
                    ? <span className='menu-item__text_count'>{ getCountNotes() }</span> : null
                }
                { item.name }
            </p>
            <UiDelete
                className="menu-item__delete"
                onClick={() => deleteGroup(item)}
            />
        </div>
    );
};

export default UiMenuItem;