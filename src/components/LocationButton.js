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
        <div>
            <div onClick={() => setInputOpen(!inputOpen)}>
                <SideButton name={name}/>
            </div>
            {inputOpen && 
            <form 
                onSubmit={handleSubmit}>
                    <label>
                        Find By Address
                        <input type="text" value={inputVal} onChange={handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>}
        </div>
    )
}