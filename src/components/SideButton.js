import React from 'react'

export default ({name, backgroundColor, callback}) => {
    backgroundColor = backgroundColor ? backgroundColor : 'rgb(200, 200, 200)'
    return (
        <div 
            style={{
                backgroundColor,
                fontFamily: 'futura',
                cursor: 'pointer',
                width: '100%', 
                height: '8vh', 
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'space-around',
                marginTop: '2px'}} 
            onClick={callback}
        >
            {name}
        </div>
        
    )
}
