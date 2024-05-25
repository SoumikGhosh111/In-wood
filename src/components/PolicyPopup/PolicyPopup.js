import React from 'react'; 
import "./PolicyPopup.css"; 

function PolicyPopup({ data }) {
    return (
        <div className='policy-popup-wrapper'>
            <pre>
                {data}
            </pre>
        </div>
    )
}

export default PolicyPopup