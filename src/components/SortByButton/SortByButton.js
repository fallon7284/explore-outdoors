import React, { useState } from 'react'
import SideButton from '../SideButton/SideButton';


export default ({name, callback}) => {
    const [inputOpen, setInputOpen] = useState(false)
    const handleChange = (e) => {
        callback(e.target.value)
    }
    return (
        <div className="button" style={{width: '95%', alignSelf: 'center', marginTop: '3px'}}>
            <div onClick={() => setInputOpen(!inputOpen)}>
                <SideButton name={name}/>
            </div>
            {inputOpen && 
            <form onChange={handleChange}>
                <label>Sort by:
                    <select placeholder="Location Name or Address" style={{width: '100%', height: '4vh', backgroundColor: 'rgb(220, 220, 220)', fontFamily: 'futura'}}>
                        <option value='distance'>Distance</option>
                        <option value='rating'>Rating</option>
                        <option value='name'>Name</option>
                    </select>
                </label>
            </form>}
        </div>
    )
}