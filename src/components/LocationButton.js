import React, { useState } from 'react'
import SideButton from './SideButton';


export default ({name, callback}) => {
    const [inputOpen, setInputOpen] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const handleChange = (e) => {
        setInputVal(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputVal)
        callback(inputVal)
    }
    return (
        <div className="button" style={{width: '95%', alignSelf: 'center', marginTop: '3px'}}>
            <div onClick={() => setInputOpen(!inputOpen)}>
                <SideButton name={name}/>
            </div>
            {inputOpen && 
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Location Name or Address"
                    style={{width: '100%', height: '4vh', backgroundColor: 'rgb(220, 220, 220)', fontFamily: 'futura'}} 
                    type="text" 
                    value={inputVal} 
                    onChange={handleChange}/>
                <button 
                    style={{width: '100%', height: '8vh', backgroundColor: 'rgb(220, 220, 220)', fontFamily: 'futura'}} 
                    type="submit" 
                    value="Submit">Submit
                </button>
            </form>}
        </div>
    )
}