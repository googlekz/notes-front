import React from 'react';
import "./UiBackground.scss"
const UiBackground = ({bgColor, change, active}: any) => {
    const getBackground = () => {
        return {
            background: bgColor || null
        };
    }
    return (
        <div onClick={() => change(bgColor)} className="background-item">
            {
                bgColor ?
                    <div
                        className={
                            `background-item__color ${bgColor === active ? 'background-item__color_active' : null}`
                        }
                        style={getBackground()}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            focusable="false"
                            className="background-item__check"
                        >
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                        </svg>
                    </div>
                    :
                    <div
                        className={
                            `background-item__color ${bgColor === active ? 'background-item__color_active' : null}`
                        }
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            focusable="false"
                            className="background-item__check"
                        >
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                        </svg>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            focusable="false"
                        >
                            <path
                                d="M21.19 21.19l-3.06-3.06-1.43-1.43-8.3-8.3L7 7 2.81 2.81 1.39 4.22l4.25 4.25A8.056 8.056 0 0 0 4.01 13H4c0 4.42 3.58 8 8 8 1.74 0 3.35-.57 4.66-1.51l3.12 3.12 1.41-1.42zM12 19c-3.22 0-5.86-2.55-5.99-5.74l.01-.19c.04-1.14.42-2.25 1.06-3.18l8.16 8.16c-.95.6-2.05.95-3.24.95zm0-14.17l4.25 4.24a6.014 6.014 0 0 1 1.74 4.01l.01.17c-.02.56-.13 1.11-.3 1.62l1.53 1.53c.49-1.03.77-2.18.77-3.4h-.01a7.975 7.975 0 0 0-2.33-5.35L12 2 8.41 5.58 9.83 7 12 4.83z"></path>
                        </svg>
                    </div>

            }
        </div>
    );
};

export default UiBackground;