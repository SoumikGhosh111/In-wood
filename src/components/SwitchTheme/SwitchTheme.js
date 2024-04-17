
import React, {useEffect, useState} from 'react'
import './SwitchTheme.css'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';

function SwitchTheme() {
    const [checked, setChecked] = useState(false); 
    return (
        <div>
            <label className='label-for-switch'>
                <input type='checkbox' checked={checked} onChange={(e) => setChecked(!checked)} />
                <span className='span-1'>
                    {/* {checked ? (
                        <NightsStayRoundedIcon sx={{ width: "15px", height: "15px" }} />
                    ) : (
                        <WbSunnyOutlinedIcon sx={{ width: "15px", height: "15px" }} />
                    )} */}
                </span>
                {!checked && (
                <span className='span-2'></span>
                )}
            </label>
        </div>
    )
}

export default SwitchTheme