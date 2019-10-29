import React from 'react'

export default ({name, backgroundColor, callback}) => {
    backgroundColor = backgroundColor ? backgroundColor : 'rgb(200, 200, 200)'
    return (
        <div 
            style={{
                color: 'white',
                fontFamily: 'futura',
                cursor: 'pointer',
                width: '95%', 
                height: '12vh', 
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'space-around',
                marginTop: '3px'}} 
            onClick={callback}
        >
            {name}
        </div>
        
    )
}
