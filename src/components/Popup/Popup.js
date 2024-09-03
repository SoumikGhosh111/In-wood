import React, { useState, useEffect } from 'react';
import "./Popup.css";
import popUpContent from "../../assets/popup_banner.jpg"; 

function Popup() {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('popupstatus');

        if (!hasVisited) {
            setTimeout(() => { 
                setVisible(true);
                sessionStorage.setItem('popupstatus', true);
            }, 2000); 
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
    }
    return (
        isVisible && (
            <div id="popup" className="popup">
                <div className="popup-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <img
                        className='popup-image' 
                        src={popUpContent}
                        alt='Ps5 banner Image'
                    />
                </div>
            </div>
        )
    )
}

export default Popup; 