import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return ( 
        <div className="welcome">
            <Link to="/home">Go to Home Page</Link>
        </div> 
    )
}