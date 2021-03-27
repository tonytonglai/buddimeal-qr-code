import React from 'react'

const Entry = ({order}) => {
    return (
        <div className="entry">
            <h3>{order.name}</h3>
        </div>
    )
}

export default Entry
